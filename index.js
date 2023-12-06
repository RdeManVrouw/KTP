var userData = {};

function recieveInput(e){
  var elem = e.target;
  userData[elem.name] = elem.value;
}

var inputSlides = document.getElementsByClassName("inputSlide");
for (var i = 0; i < inputSlides.length; i++){
  for (var j = 0; j < inputSlides[i].children.length - 2; j++){
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
