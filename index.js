var slideIndex = 0;
var inputSlides = document.getElementsByClassName("inputSlide");
var userData = {};

function recieveInput(e){
  var elem = e.target;
  userData[elem.name] = elem.value;
}


function isChar(chr){
  var val = chr.charCodeAt();
  return (val >= 97 && val <= 122) || (val >= 65 && val <= 90);
}
function isDigit(chr){
  var val = chr.charCodeAt();
  return val >= 48 && val <= 57;
}
function ageFromDate(str){
    var ageDifMs = Date.now() - new Date(str).getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// This function contains the rules for steps 2 and 3
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
        if (str.length != 18 || !(isChar(str[0]) && isChar(str[1]) && isDigit(str[2]) && isDigit(str[3]) && isChar(str[4]) && isChar(str[5]) && isChar(str[6]) && isChar(str[7]) && isDigit(str[8]) && isDigit(str[9]) && isDigit(str[10]) && isDigit(str[11]) && isDigit(str[12]) && isDigit(str[13]) && isDigit(str[14]) && isDigit(str[15]) && isDigit(str[16]) && isDigit(str[17]))){
          alert("'IBAN' invalid");
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
