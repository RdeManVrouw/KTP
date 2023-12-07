var slideIndex = 0;
var inputSlides = document.getElementsByClassName("inputSlide");
var userData = {};

function recieveInput(e){
  var elem = e.target;
  userData[elem.name] = elem.value;
}

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
        }
        break;
      case "IBAN":
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
