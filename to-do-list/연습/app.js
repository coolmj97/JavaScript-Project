"use strict";

const toDoForm = document.querySelector("form");
const toDoInput = document.querySelector("input");
const toDoList = document.querySelector("ul");
const button = document.querySelector("button");

const HIDDEN_CN = "hidden";
const DELETE_CN = "delete-button";

function limitList() {
  const list = document.querySelectorAll("li");
  list.forEach(function () {
    if (list.length < 10) {
      return;
    }
    list.classList.add(HIDDEN);
  });
}
limitList();

function deleteList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
}

function clickButton(event) {
  event.preventDefault();
  const list = document.createElement("li");
  const deleteBtn = document.createElement("button");
  list.innerHTML = toDoInput.value;
  deleteBtn.innerText = "삭제";
  deleteBtn.addEventListener("click", deleteList);
  toDoList.appendChild(list);
  list.appendChild(deleteBtn);
  deleteBtn.classList.add(DELETE_CN);
  toDoInput.value = "";
}

button.addEventListener("click", clickButton);
toDoForm.addEventListener("submit", clickButton);
