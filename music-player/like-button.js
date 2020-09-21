"use strict";

const buttons = document.querySelectorAll(".like-button");

function changeColor(event) {
  const status = event.target.classList.contains("active"); //클릭된 객체의 클래스에 active가 포함되어 있는지
  event.target.classList.add(status ? "cancel" : "active"); //'active'가 있냐 없냐!
  event.target.classList.remove(status ? "active" : "cancel");

  //   event.target.classList.toggle("active");
}

buttons.forEach(function (button) {
  button.addEventListener("click", changeColor);
});
