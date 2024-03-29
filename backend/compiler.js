/*
program         : goalblock [inferenceblock | inputblock]*
goalblock       : GOAL [identifier]* END

inputblock      : INPUT datatype identifier END
                | INPUT identifier [constant]+ END
inferenceblock  : datatype identifier BEGIN statementlist END
statementlist   : [ifstatement | command]*
ifstatement     : IF expression THEN statementlist [ELSE statementlist]? END
command         : RETURN expression END

datatype        : NUMBER | STRING | BOOLEAN
digit           : [0-9]
character       : [a-z] | [A-Z]
identifier      : ('_' | character) ['_' | character | digit]*                          // an identifier cannot be a keyword
binaryoperator  : '==' | '!=' | '>=' | '<=' | '>' | '<'
integer         : [digit]*
number          : integer '.' integer
string          : '"' <anything you want> '"'

expression      : Term1 [(AND | OR) Term1]*
Term1           : Term2 [binaryoperator Term2]*
                | NOT Term1
Term2           : Term3 [('+' | '-') Term3]*
Term3           : Term4 [('*' | '/' | DIV) Term4]*
Term4           : '(' expression ')'
                | '-' Term4
                | identifier
                | constant
constant        : number | string | TRUE | FALSE
*/
const keywords = ["GOAL", "END", "BEGIN", "STRING", "IF", "THEN", "ELSE", "NUMBER", "BOOLEAN", "AND", "OR", "NOT", "RETURN", "INPUT", "TRUE", "FALSE", "DIV"];

Array.prototype.copy = function (){
  let output = [];
  for (let i = 0; i < this.length; i++){
    if ((typeof this[i]) == "object"){
      output.push(this[i].copy());
    } else {
      output.push(this[i]);
    }
  }
  return output;
}

class Program {
  constructor(){
    this.goalIdentifiers = [];
    this.blocks = [];
    this.parameters = {};
    this.message;
    this.stack = [];
  }

  stepBackwardchain(){
    this.message = undefined;
    while (this.stack.length){
      var current = this.stack[this.stack.length - 1];
      if (this.parameters[current] != undefined){
        this.stack.pop();
        continue;
      }
      for (var j = 0; j < this.blocks.length; j++){
        if (this.blocks[j].containsIdentifier(current)){
          var value = this.blocks[j].execute(this);
          switch (value){
            case null:
              if ((typeof this.message) == "object") return false;
              this.stack.push(this.message);
              break;
            case undefined:
              console.log("inference block for identifier '" + this.blocks[j].identifier + "' returns nothing");
              return false;
            default: this.parameters[current] = value;
          }
          break;
        }
      }
    }
    return true;
  }

  setFact(identifier, value){
    if (identifier == undefined || value == undefined) return;
    if ((typeof identifier) == "object"){
      for (var i = 0; i < identifier.length; i++) this.parameters[identifier[i]] = value[i] ? 1 : 0;
    } else {
      this.parameters[identifier] = value;
    }
  }

  static compile(str){
    var program = new Program();
    var index = new Pointer();
    if (Program.acceptGoalBlock(str, index, program)){
      var block = new Block();
      while (Block.acceptBlock(str, index, block)){
        program.blocks.push(block);
        block = new Block();
      }
      skipSpaces(str, index);
      if (index.i != str.length){
        throw_error(str, index.i, "compiler failure");
        return null;
      }
      var identifiers = program.getAllIdentifiers();
      for (var i = 0; i < identifiers.length; i++){
        var exists = false;
        for (var j = 0; j < program.blocks.length; j++){
          if (program.blocks[j].containsIdentifier(identifiers[i])){
            exists = true;
            break;
          }
        }
        if (!exists){
          throw_error(str, index.i, "identifier '" + identifiers[i] + "' not defined");
          return null;
        }
      }
      for (var i = program.goalIdentifiers.length - 1; i >= 0; i--) program.stack.push(program.goalIdentifiers[i]);
      return program;
    } else {
      throw_error(str, index.i, "no GOAL-block found");
      return null;
    }
  }

  getAllIdentifiers(){
    var output = this.goalIdentifiers.copy();
    for (var i = 0; i < this.blocks.length; i++) this.blocks[i].getAllIdentifiers(output);
    return output;
  }
  static acceptGoalBlock(str, index, program){
    var temp = index.i;
    if (acceptKeyword(str, index, "GOAL")){
      var identifier = new Pointer();
      while (acceptNonKeyword(str, index, identifier)) program.goalIdentifiers.push(identifier.i);
      if (!acceptKeyword(str, index, "END")){
        index.i = temp;
        throw_error(str, index.i, "expected END after GOAL");
        return false;
      }
      return true;
    }
    return false;
  }
}
class Block {
  constructor(){
    this.type = undefined; // inference block, input value, input choice
    this.datatype = undefined; // "NUMBER", "STRING", "BOOLEAN"
    this.statementList = undefined;
    this.identifier = undefined;
    this.choices = undefined; // contains the values of the choices (only used when type == 2)
  }

  execute(prgm){
    switch (this.type){
      case 0:
        return this.statementList.execute(prgm);
      case 1:
        prgm.message = {inputType: "value", identifier: this.identifier, datatype: this.datatype};
        return null;
      case 2:
        prgm.message = {inputType: "choice", identifier: this.identifier, choices: this.choices.copy()};
        return null;
    }
  }

  getAllIdentifiers(list){
    if (!list.includes(this.identifier)) list.push(this.identifier);
    if (this.statementList != undefined) this.statementList.getAllIdentifiers(list);
  }
  containsIdentifier(identifier){
    return this.identifier == identifier;
  }
  static acceptBlock(str, index, block){
    var temp = index.i;
    var datatype = new Pointer();
    if (acceptKeyword(str, index, "INPUT")){
      var identifier = new Pointer();
      if (acceptDatatype(str, index, datatype)){
        if (acceptNonKeyword(str, index, identifier)){
          if (!acceptKeyword(str, index, "END")){
            throw_error(str, index.i, "missing END");
            index.i = temp;
            return false;
          }
          block.type = 1;
          block.datatype = datatype.i;
          block.identifier = identifier.i;
          return true;
        } else {
          throw_error(str, index.i, "expected identifier");
        }
        index.i = temp;
        return false;
      }
      if (acceptNonKeyword(str, index, identifier)){
        var constant = new Pointer();
        if (Expr.acceptConstant(str, index, constant)){
          block.choices = [constant.i];
          while (Expr.acceptConstant(str, index, constant)) block.choices.push(constant.i);
          if (!acceptKeyword(str, index, "END")){
            block.choices = undefined;
            throw_error(str, index.i, "missing END");
            index.i = temp;
            return false;
          }
          block.type = 2;
          block.identifier = identifier.i;
          return true;
        } else {
          throw_error(str, index.i, "has to contain at least 1 choice (constant value)");
        }
        index.i = temp;
        return false;
      }
      throw_error(str, index.i, "'INPUT' has to be followed a datatype or an identifier");
      index.i = temp;
      return false;
    }
    if (acceptDatatype(str, index, datatype)){
      var identifier = new Pointer();
      if (acceptNonKeyword(str, index, identifier)){
        if (acceptKeyword(str, index, "BEGIN")){
          var node = new Node();
          if (Node.acceptStatementList(str, index, node)){
            if (!acceptKeyword(str, index, "END")){
              throw_error(str, index.i, "missing END");
              index.i = temp;
              return false;
            }
            block.type = 0;
            block.datatype = datatype.i;
            block.identifier = identifier.i;
            block.statementList = node;
            return true;
          }
        } else {
          throw_error(str, index.i, "expected BEGIN");
        }
      } else {
        throw_error(str, index.i, "expected identifier");
      }
    }
    index.i = temp;
    return false;
  }
}
class Node {
  constructor(){
    this.type = 2; // if, command, statement list
    this.children = [];
    this.expr = undefined; // in the if-statement or for RETURN
    this.commandName = undefined;
  }

  execute(prgm){
    switch (this.type){
      case 0:
        var val = this.expr.evaluate(prgm);
        if (val == null) return null;
        if (val){
          return this.children[0].execute(prgm);
        } else if (this.children.length > 1){
          return this.children[1].execute(prgm);
        }
        return undefined;
      case 1:
        return this.expr.evaluate(prgm);
      case 2:
        for (var i = 0; i < this.children.length; i++){
          var val = this.children[i].execute(prgm);
          switch (val){
            case null:
              return null;
            case undefined:
              break;
            default:
              return val;
          }
        }
        return undefined;
    }
  }

  getAllIdentifiers(list){
    if (this.expr != undefined) this.expr.getAllIdentifiers(list);
    for (var i = 0; i < this.children.length; i++) this.children[i].getAllIdentifiers(list);
  }
  static acceptIfStatement(str, index, node){
    var temp = index.i;
    var child = new Node();
    node.expr = new Expr();
    if (acceptKeyword(str, index, "IF") && Expr.acceptExpression(str, index, node.expr) && acceptKeyword(str, index, "THEN") && Node.acceptStatementList(str, index, child)){
      node.children.push(child);
      if (acceptKeyword(str, index, "ELSE")){
        child = new Node();
        Node.acceptStatementList(str, index, child);
        node.children.push(child);
      }
      if (!acceptKeyword(str, index, "END")){
        node.children = [];
        node.expr = undefined;
        throw_error(str, index.i, "expected END after IF-statement");
        return false;
      }
      node.type = 0;
      return true;
    }
    node.expr = undefined;
    index.i = temp;
    return false;
  }
  static acceptStatementList(str, index, node){
    node.type = 2;
    var child = new Node();
    while (Node.acceptIfStatement(str, index, child) || Node.acceptCommand(str, index, child)){
      node.children.push(child);
      child = new Node();
    }
    return true;
  }
  static acceptCommand(str, index, node){
    var temp = index.i;
    if (acceptKeyword(str, index, "RETURN")){
      node.expr = new Expr();
      if (Expr.acceptExpression(str, index, node.expr)){
        if (!acceptKeyword(str, index, "END")){
          node.expr = undefined;
          index.i = temp;
          throw_error(str, index.i, "expected END");
          return false;
        }
        node.type = 1;
        node.commandName = "RETURN";
        return true;
      }
      node.expr = undefined;
      index.i = temp;
      throw_error(str, index.i, "RETURN ...");
      return false;
    }
    return false;
  }
}
class Expr {
  constructor(value, type, children = []){
    this.children = children;
    this.value = value; // (name of the operator or variable) or the constant
    this.type = type;  // operator, variable, constant
  }

  evaluate(program){
    switch (this.type){
      case 0:
        var vals = [];
        for (var i = 0; i < this.children.length; i++){
          vals[i] = this.children[i].evaluate(program);
          if (vals[i] == null) return null;
        }
        switch (this.value.toUpperCase()){
          case ">":
            return vals[0] > vals[1];
          case "<":
            return vals[0] < vals[1];
          case "==":
            return vals[0] == vals[1];
          case ">=":
            return vals[0] >= vals[1];
          case "<=":
            return vals[0] <= vals[1];
          case "!=":
            return vals[0] != vals[1];
          case "+":
            return vals[0] + vals[1];
          case "-":
            return vals[0] - vals[1];
          case "*":
            return vals[0] * vals[1];
          case "/":
            return vals[0] / vals[1];
          case "AND":
            return vals[0] && vals[1];
          case "OR":
            return vals[0] || vals[1];
          case "NOT":
            return !vals[0];
          case "DIV":
            return Math.floor(vals[0] / vals[1]);
          default:
            console.log(this);
            console.log("unknown operator '" + this.value.toUpperCase() + "'");
            return null;
        }
      case 1:
        if (program.parameters[this.value] == undefined){
          program.message = this.value;
          return null;
        }
        return program.parameters[this.value];
      default:
        return this.value;
    }
  }

  getAllIdentifiers(list){
    if (this.type == 1 && !list.includes(this.value)) list.push(this.value);
    for (var i = 0; i < this.children.length; i++) this.children[i].getAllIdentifiers(list);
  }

  clean(){
    this.value = undefined;
    this.children = [];
  }

  copy(){
    var output = new Expr();
    for (var i = 0; i < this.children.length; i++) output.children.push(this.children[i].copy());
    output.value = this.value;
    output.type = this.type;
    return output;
  }

  static acceptOperator(str, index, op, item){
    var temp = index.i;
    skipSpaces(str, index);
    if (index.i + op.length >= str.length){
      index.i = temp;
      return false;
    }
    for (var i = 0; i < op.length; i++){
      if (str[index.i + i].toUpperCase() != op[i].toUpperCase()){
        index.i = temp;
        return false;
      }
    }
    index.i += op.length;
    item.i = op;
    return true;
  }
  static acceptBinary(str, index, item){
    var temp = index.i;
    skipSpaces(str, index);
    var bin2 = str[index.i] + str[index.i + 1];
    if (bin2 == "==" || bin2 == "<=" || bin2 == ">=" || bin2 == "!="){
      item.i = bin2;
      index.i += 2;
      return true;
    }
    if (str[index.i] == '<' || str[index.i] == '>'){
      item.i = str[index.i];
      index.i++;
      return true;
    }
    index.i = temp;
    return false;
  }

  static acceptExpression(str, index, expr){
    var temp = index.i;
    if (Expr.acceptTerm1(str, index, expr)){
      var operator = new Pointer();
      var child = new Expr();
      var readOperator;
      while ((readOperator = (Expr.acceptOperator(str, index, "AND", operator) || Expr.acceptOperator(str, index, "OR", operator))) && Expr.acceptTerm1(str, index, child)){
        var copy = expr.copy();
        expr.value = operator.i;
        expr.type = 0;
        expr.children = [copy, child];
        child = new Expr();
      }
      if (readOperator){
        index.i = temp;
        expr.clean();
        return false;
      }
      return true;
    }
    index.i = temp;
    expr.clean();
    return false;
  }
  static acceptTerm1(str, index, expr){
    var temp = index.i;
    if (Expr.acceptOperator(str, index, "NOT", new Pointer())){
      if (Expr.acceptTerm1(str, index, expr)){
        var copy = expr.copy();
        expr.value = "NOT";
        expr.type = 0;
        expr.children = [copy];
        return true;
      }
      index.i = temp;
      return false;
    }
    if (Expr.acceptTerm2(str, index, expr)){
      var operator = new Pointer();
      var child = new Expr();
      var readOperator;
      while ((readOperator = Expr.acceptBinary(str, index, operator)) && Expr.acceptTerm2(str, index, child)){
        var copy = expr.copy();
        expr.value = operator.i;
        expr.type = 0;
        expr.children = [copy, child];
        child = new Expr();
      }
      if (readOperator){
        index.i = temp;
        expr.clean();
        return false;
      }
      return true;
    }
    index.i = temp;
    expr.clean();
    return false;
  }
  static acceptTerm2(str, index, expr){
    var temp = index.i;
    if (Expr.acceptTerm3(str, index, expr)){
      var operator = new Pointer();
      var child = new Expr();
      var readOperator;
      while ((readOperator = (Expr.acceptOperator(str, index, "+", operator) || Expr.acceptOperator(str, index, "-", operator))) && Expr.acceptTerm3(str, index, child)){
        var copy = expr.copy();
        expr.value = operator.i;
        expr.type = 0;
        expr.children = [copy, child];
        child = new Expr();
      }
      if (readOperator){
        index.i = temp;
        expr.clean();
        return false;
      }
      return true;
    }
    index.i = temp;
    expr.clean();
    return false;
  }
  static acceptTerm3(str, index, expr){
    var temp = index.i;
    if (Expr.acceptTerm4(str, index, expr)){
      var operator = new Pointer();
      var child = new Expr();
      var readOperator;
      while ((readOperator = (Expr.acceptOperator(str, index, "*", operator) || Expr.acceptOperator(str, index, "/", operator) || Expr.acceptOperator(str, index, "DIV", operator))) && Expr.acceptTerm4(str, index, child)){
        var copy = expr.copy();
        expr.value = operator.i;
        expr.type = 0;
        expr.children = [copy, child];
        child = new Expr();
      }
      if (readOperator){
        index.i = temp;
        expr.clean();
        return false;
      }
      return true;
    }
    index.i = temp;
    expr.clean();
    return false;
  }
  static acceptTerm4(str, index, expr){
    var temp = index.i;
    skipSpaces(str, index);
    if (match(str, index, '(')){
      if (Expr.acceptExpression(str, index, expr)){
        skipSpaces(str, index);
        if (match(str, index, ')')) return true;
      }
      expr.clean();
      index.i = temp;
      return false;
    }
    var item = new Pointer();
    if (Expr.acceptConstant(str, index, item)){
      expr.type = 2;
      expr.value = item.i;
      return true;
    }
    if (acceptNonKeyword(str, index, item)){
      expr.type = 1;
      expr.value = item.i;
      return true;
    }
    if (match(str, index, '-')){
      var child = new Expr();
      if (Expr.acceptTerm4(str, index, child)){
        expr.value = '*';
        expr.type = 0;
        expr.children = [new Expr(-1, 2), child];
        return true;
      }
    }
    index.i = temp;
    return false;
  }
  static acceptConstant(str, index, item){
    var temp = index.i;
    skipSpaces(str, index);
    if (acceptNumber(str, index, item) || acceptString(str, index, item)) return true;
    if (acceptKeyword(str, index, "true")){
      item.i = true;
      return true;
    }
    if (acceptKeyword(str, index, "false")){
      item.i = false;
      return true;
    }
    index.i = temp;
    return false;
  }
}

// javascript does not have pointers. We use this class as a replacement
class Pointer {
  constructor(){ this.i = 0; }
}

function throw_error(str, index, message){
  var line = 1;
  for (var i = 0; i < index; i++) line += str[i] == '\n';
  console.log("Compiler ERROR: " + message + " on line " + line);
}

function skipSpaces(str, index){
  while (str[index.i] == ' ' || str[index.i] == '\t' || str[index.i] == '\n') index.i++;
}
function match(str, index, token){
  if (str[index.i] == token){
    index.i++;
    return true;
  }
  return false;
}
function isKeyword(identifier){
  return keywords.includes(identifier.toUpperCase());
}

function acceptDigit(str, index){
  if (str.charCodeAt(index.i) >= 48 && str.charCodeAt(index.i) <= 57){
    index.i++;
    return true;
  }
  return false;
}
function acceptCharacter(str, index){
  var val = str.charCodeAt(index.i);
  if ((val >= 97 && val <= 122) || (val >= 65 && val <= 90)){
    index.i++;
    return true;
  }
  return false;
}
function acceptInteger(str, index, item){
  if (acceptDigit(str, index)){
    var val = str.charCodeAt(index.i - 1) - 48;
    while (acceptDigit(str, index)) val = 10 * val + str.charCodeAt(index.i - 1) - 48;
    item.i = val;
    return true;
  }
  return false;
}
function acceptNumber(str, index, item){
  if (acceptInteger(str, index, item)){
    if (str[index.i] == '.'){
      index.i++;
      var val = 0;
      var power = 0.1;
      while (acceptDigit(str, index)){
        val += power * (str.charCodeAt(index.i - 1) - 48);
        power /= 10;
      }
      item.i += val;
    }
    return true;
  }
  return false;
}
function acceptString(str, index, item){
  if (str[index.i] == '"'){
    index.i++;
    item.i = "";
    while (str[index.i] != '"'){
      item.i += str[index.i];
      index.i++;
      if (index.i == str.length){
        throw_error(str, index.i, "string has to end with '\"'");
        return false;
      }
    }
    index.i++;
    return true;
  }
  return false;
}

function acceptIdentifier(str, index, item){
  skipSpaces(str, index);
  if (match(str, index, '_') || acceptCharacter(str, index)){
    item.i = str[index.i - 1];
    while (match(str, index, '_') || acceptCharacter(str, index) || acceptDigit(str, index)) item.i += str[index.i - 1];
    return true;
  }
  return false;
}
function acceptKeyword(str, index, keyword){
  var temp = index.i;
  var item = new Pointer();
  if (acceptIdentifier(str, index, item) && item.i.toUpperCase() == keyword.toUpperCase()) return true;
  index.i = temp;
  return false;
}
function acceptNonKeyword(str, index, item){
  var temp = index.i;
  if (acceptIdentifier(str, index, item)){
    if (isKeyword(item.i)){
      index.i = temp;
      return false;
    }
    return true;
  }
  return false;
}
function acceptDatatype(str, index, item){
  if (acceptKeyword(str, index, "number")){
    item.i = "NUMBER";
    return true;
  }
  if (acceptKeyword(str, index, "string")){
    item.i = "STRING";
    return true;
  }
  if (acceptKeyword(str, index, "boolean")){
    item.i = "BOOLEAN";
    return true;
  }
  return false;
}

module.exports = Program;
