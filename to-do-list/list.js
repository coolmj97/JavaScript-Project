'use strict'

const form = document.querySelector('form')
const input = document.querySelector('input')
const todoList = document.querySelector('.todo-list')
const closeButton = document.querySelector('.button-close')
const btnClear = document.querySelector('.clear-all')
const toDoCount = document.querySelector('.todo-count')

let allToDos = []

function clearList() {
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild)
  }
  localStorage.clear()
  allToDos = []
  toDoCount.innerHTML = `<strong>${allToDos.length}</strong> 개의 할 일 남음`
}

function saveList() {
  localStorage.setItem('ALL', JSON.stringify(allToDos))
}

function createList(text) {
  const list = document.createElement('li')
  const emptyBox = document.createElement('button')
  const delBtn = document.createElement('button')
  const order = allToDos.length + 1

  list.id = order //html
  emptyBox.classList.add('button-check')
  delBtn.classList.add('button-close')
  emptyBox.innerHTML = `<i class="far fa-square empty-box"></i>`
  delBtn.innerHTML = `<i class="fas fa-times close-box"></i>`
  delBtn.addEventListener('click', () => {
    const currentList = delBtn.parentNode
    todoList.removeChild(currentList)
    const filteredList = allToDos.filter(
      (todo) => todo.id !== parseInt(currentList.id)
    )
    allToDos = filteredList
    toDoCount.innerHTML = `<strong>${allToDos.length}</strong> 개의 할 일 남음`

    saveList()
  })

  list.innerText = text
  list.prepend(emptyBox)
  list.appendChild(delBtn)
  todoList.appendChild(list)

  const toDoObj = {
    id: order,
    text: text,
  }

  allToDos.push(toDoObj)
  toDoCount.innerHTML = `<strong>${allToDos.length}</strong> 개의 할 일 남음`

  saveList()
}

function handleSubmit(event) {
  event.preventDefault()
  const currentValue = input.value
  createList(currentValue)
  input.value = ''
}

// 로컬 정보가 있으면 파싱한다.
function loadList() {
  const loadedAll = localStorage.getItem('ALL')

  if (loadedAll !== null) {
    const parsedAll = JSON.parse(loadedAll)
    parsedAll.forEach((list) => {
      createList(list.text)
    })
  }
}

function init() {
  loadList()
  form.addEventListener('submit', handleSubmit)
  btnClear.addEventListener('click', clearList)
}

init()
