'use strict'

const form = document.querySelector('form')
const input = document.querySelector('input')
const todoList = document.querySelector('.todo-list')
const closeButton = document.querySelector('.button-close')
const btnClear = document.querySelector('.clear-all')
const toDoCount = document.querySelector('.todo-count')

let allToDos = []
let allCompleted = []

function clearList() {
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild)
  }
  localStorage.clear()
  allToDos = []
  allCompleted = []

  toDoCount.innerHTML = `<strong>${allToDos.length}</strong> 개의 할 일 남음`
}

function saveList() {
  localStorage.setItem('ALL', JSON.stringify(allToDos))
  localStorage.setItem('COMPLETED', JSON.stringify(allCompleted))
}

function createList(text) {
  const list = document.createElement('li')
  const emptyBox = document.createElement('button')
  const delBtn = document.createElement('button')
  const order = allToDos.length + 1
  let status = 'all'

  list.id = order //html
  emptyBox.classList.add('button-check')
  emptyBox.classList.add('active')
  delBtn.classList.add('button-close')
  emptyBox.innerHTML = `<i class="far fa-square empty-box"></i>`
  emptyBox.addEventListener('click', () => {
    const standard = emptyBox.classList.contains('active')

    if (standard) {
      emptyBox.innerHTML = `<i class="far fa-check-square check-box cancel"></i>`
      emptyBox.classList.remove('active')
      emptyBox.classList.add('cancel')
      delBtn.classList.add('cancel')
      list.classList.add('cancel')
      toDoObj.status = 'completed'
      allCompleted.push(toDoObj)

      const currentList = emptyBox.parentNode
      const filteredList = allToDos.filter(
        (item) => item.id !== parseInt(currentList.id)
      )
      allToDos = filteredList
      allCompleted.sort((a, b) => a.id - b.id)
    } else {
      emptyBox.innerHTML = `<i class="far fa-square empty-box"></i>`
      emptyBox.classList.remove('cancel')
      emptyBox.classList.add('active')
      delBtn.classList.remove('cancel')
      list.classList.remove('cancel')
      toDoObj.status = 'all'
      allToDos.push(toDoObj)

      const currentList = emptyBox.parentNode
      const filteredList = allCompleted.filter(
        (item) => item.id !== parseInt(currentList.id)
      )
      allCompleted = filteredList
      allToDos.sort((a, b) => a.id - b.id)
    }

    toDoCount.innerHTML = `<strong>${allToDos.length}</strong> 개의 할 일 남음`
    saveList()
  })

  delBtn.innerHTML = `<i class="fas fa-times close-box"></i>`
  delBtn.addEventListener('click', () => {
    const currentList = delBtn.parentNode
    todoList.removeChild(currentList)
    const filteredList = allToDos.filter(
      (item) => item.id !== parseInt(currentList.id)
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
    status: status,
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
