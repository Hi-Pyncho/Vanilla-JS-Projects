//Selectors

const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', (e) => {
  addTodo(e, todoInput.value)
  saveLocalTodos(todoInput.value)
  clearInputValue(todoInput)
})
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Functions

function addTodo(event, text) {
  if(event) {
    event.preventDefault()
  }

  const todoDiv = document.querySelector('#todo-item').content.cloneNode(true)
  todoDiv.querySelector('.todo-item').textContent = text

  todoList.append(todoDiv)
}


function clearInputValue(input) {
  input.value = ''
}

function deleteCheck(event) {
  const item = event.target
  
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement
    todo.classList.add('fall')

    removeLocalTodo(todo)

    todo.addEventListener('transitionend', function() {
      todo.remove()
    })
    
  }

  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}

function filterTodo(event) {
  const todos = Array.from(todoList.children)

  todos.forEach(function(todo) {
    switch(event.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted': 
        if(!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}

function createLocalTodo(key) {
  let todos
  if(localStorage.getItem(key) === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem(key))
  }

  return todos
}

function getTodos() {
  let todos = createLocalTodo('todos')

  todos.forEach((todo) => {
    addTodo(null, todo)
  })
}

function saveLocalTodos(todo) {
  let todos = createLocalTodo('todos')

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function removeLocalTodo(todo) {
  let todos = createLocalTodo('todos')
  const todoIndex = todo.children[0].textContent

  todos.splice(todos.indexOf(todoIndex), 1)

  localStorage.setItem('todos', JSON.stringify(todos))
}







