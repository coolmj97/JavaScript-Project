'use strict'

const toDoToday = document.querySelector('.todo-today')

const today = new Date()

let day = today.getDay()
const date = today.getDate()
const month = today.getMonth()
const year = today.getFullYear()

switch (day) {
  case 0:
    day = '일'
    break
  case 1:
    day = '월'
    break
  case 2:
    day = '화'
    break
  case 3:
    day = '수'
    break
  case 4:
    day = '목'
    break
  case 5:
    day = '금'
    break
  case 6:
    day = '토'
    break
}

function displayToday() {
  const span = document.createElement('span')
  span.innerText = `${year}년 ${month + 1}월 ${date}일 ${day}요일`
  span.classList.add('js-today')
  toDoToday.prepend(span)
}
displayToday()
