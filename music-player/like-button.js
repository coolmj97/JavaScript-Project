'use strict'

const buttons = document.querySelectorAll('.like-button')

function changeColor(event) {
  const status = event.target.classList.contains('active')
  event.target.classList.add(status ? 'cancel' : 'active')
  event.target.classList.remove(status ? 'active' : 'cancel')
}

buttons.forEach(function (button) {
  button.addEventListener('click', changeColor)
})
