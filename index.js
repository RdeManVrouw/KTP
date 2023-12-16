var slideIndex = 0;
var inputSlides = document.getElementsByClassName("inputSlide");
var userData = {};

function recieveInput(e){
  var elem = e.target;
  if (elem.tagName == "SELECT" && elem.multiple){
    var str = [];
    for (var i = 0; i < elem.options.length; i++){
      if (elem.options[i].selected) str.push(elem.options[i].value);
    }
    userData[elem.name] = str.join();
    return;
  }
  userData[elem.name] = elem.value;
}

// this code was copied from stack overflow
function ageFromDate(str){
  var ageDifMs = Date.now() - new Date(str).getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// This function contains the rules for the system up until this point
function isDataValid(){
  for (var i = 0; i < inputSlides[slideIndex].children.length; i++){
    if (inputSlides[slideIndex].children[i].tagName != "DIV") continue;
    var elem = inputSlides[slideIndex].children[i].children[1];
    if (elem.tagName == "SELECT") continue;
    var str = userData[elem.name];
    if (str == null){
      alert("Input required at '" + elem.name + "'");
      return false;
    }
    switch (elem.name){
      case "Date of Birth":
        if (isNaN(new Date(str))){
          alert("'Date of Birth' invalid");
          return false;
        } else {
          var age = ageFromDate(str);
          if (age < 18 || age > 65){
            alert("Too old or too young");
            return false;
          }
        }
        break;
      case "ID Expire Date":
        if (isNaN(new Date(str))){
          alert("'ID Expire Date' invalid");
          return false;
        }
        break;
      case "IBAN":
        str = str.replaceAll(" ", "");
        if (str.match("[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{4}[0-9]{10}") == null){
          alert("'IBAN' invalid");
          return false;
        }
        break;
      case "Mobile":
        str = str.replaceAll(" ", "");
        // this regex is copied from https://ihateregex.io/expr/phone/
        if (str.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g) == null){
          alert("'Mobile' invalid");
          return false;
        }
        break;
      case "Email":
        if (str.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null){
          alert("'Email' invalid");
          return false;
        }
        break;
      case "ID Number":
        if (str.match(/[0-9]{6}[0-9]*/g) == null){
          alert("'ID Number' invalid");
          return false;
        }
        break;
    }
  }
  return true;
}

function nextButton(){
  if (!isDataValid()) return;
  inputSlides[slideIndex].style.visibility = "hidden";
  slideIndex++;
  if (slideIndex >= inputSlides.length){
    // initialize next stage
  } else {
    inputSlides[slideIndex].style.visibility = "visible";
  }
}

function previousButton(){
  inputSlides[slideIndex].style.visibility = "hidden";
  slideIndex--;
  inputSlides[slideIndex].style.visibility = "visible";
}

/*
This part acts like a 'setup'-function.
It gets the elements ready for the user.
 - Appropriate classes are given to appropriate elements
 - Eventlisteners are added
*/
for (var i = 0; i < inputSlides.length; i++){
  if (i != slideIndex) inputSlides[i].style.visibility = "hidden";
  for (var j = 0; j < inputSlides[i].children.length; j++){
    if (inputSlides[i].children[j].tagName != "DIV") continue;
    var child = inputSlides[i].children[j]; // a knowledgeElement div
    child.className = "knowledgeElement";
    child.children[0].className = "knowledgeElementTitle";
    switch (child.children[1].tagName){
      case "SELECT":
        child.children[1].className = "selectInput";
        break;
      case "INPUT":
        child.children[1].className = "textInput";
    }
    child.children[1].addEventListener("change", recieveInput);
    child.children[1].name = child.children[0].innerHTML;
    userData[child.children[0].innerHTML] = null;
  }
}
var previousButtons = document.getElementsByClassName("previousButton");
for (butn of previousButtons) butn.addEventListener("click", previousButton);
var nextButtons = document.getElementsByClassName("nextButton");
for (butn of nextButtons) butn.addEventListener("click", nextButton);

// example of how to compile a knowledge base
var prgm = Program.compile(knowledge_base_txt);
console.log(prgm);
if (prgm != null){
  var message = new Pointer();
  if (prgm.execute(message)){
    console.log("execution completed");
    console.log(prgm.parameters);
  } else {
    console.log("execution not completed: " + message.i);
  }
}
