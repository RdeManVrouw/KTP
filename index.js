var userData = {};

function recieveInput(e){
  var elem = e.target;
  userData[elem.name] = elem.value;
}

function nextButton(){
  // validity check of the data
  inputSlide[slideIndex].style.visibility = "hidden";
  slideIndex++;

}

function previousButton(){
  // validity check of the data

}

var slideIndex = 0;
var inputSlides = document.getElementsByClassName("inputSlide");
for (var i = 0; i < inputSlides.length; i++){
  if (i != slideIndex) inputSlides[i].style.visibility = "hidden";
  var j;
  for (j = 0; j < inputSlides[i].children.length - 2; j++){
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
  inputSlides[i].children[j].addEventListener("click", previousButton);
  inputSlides[i].children[j + 1].addEventListener("click", nextButton);
}
