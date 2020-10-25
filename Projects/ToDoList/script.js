//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
// todoButton.addEventListener('click', addTodo)
todoButton.addEventListener('click', (e) => {
  addTodo(e)
  saveLocalTodos(todoInput.value)
  clearInputValue(todoInput)
})
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Functions
function clearInputValue(input) {
  input.value = ''
}

// function addTodo(event) {
//   event.preventDefault()

//   const todoDiv = document.createElement('div')
//   todoDiv.classList.add('todo')

//   const inputText = todoInput.value
//   const newTodo = document.createElement('li')
//   newTodo.textContent = inputText
//   newTodo.classList.add('todo-item')
//   todoDiv.append(newTodo)

//   saveLocalTodos(todoInput.value)

//   const completedButton = document.createElement('button')
//   completedButton.innerHTML = `<i class='fas fa-check'></i>`
//   completedButton.classList.add('complete-btn')
//   todoDiv.append(completedButton)

//   const deletedButton = document.createElement('button')
//   deletedButton.innerHTML = `<i class='fas fa-trash'></i>`
//   deletedButton.classList.add('delete-btn')
//   todoDiv.append(deletedButton)

//   todoList.append(todoDiv)

//   clearInputValue(todoInput)
  
// }

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
  console.log(todos)
  todos.forEach(function(todo) {
    console.log(todo.classList)
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

function saveLocalTodos(todo) {
  let todos = createLocalTodo('todos')

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
  let todos
  if(localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach((todo) => {
    // const todoDiv = document.createElement('div')
    // todoDiv.classList.add('todo')

    // const newTodo = document.createElement('li')
    // newTodo.textContent = todo
    // newTodo.classList.add('todo-item')
    // todoDiv.append(newTodo)

    // const completedButton = document.createElement('button')
    // completedButton.innerHTML = `<i class='fas fa-check'></i>`
    // completedButton.classList.add('complete-btn')
    // todoDiv.append(completedButton)

    // const deletedButton = document.createElement('button')
    // deletedButton.innerHTML = `<i class='fas fa-trash'></i>`
    // deletedButton.classList.add('delete-btn')
    // todoDiv.append(deletedButton)

    // todoList.append(todoDiv)
    addTodo(null, todo)
  })

}

function removeLocalTodo(todo) {
  let todos = createLocalTodo('todos')

  const todoIndex = todo.children[0].textContent
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}

const todoDiv = document.querySelector('#todo-item').content
console.log(todoDiv.querySelector('.todo-item').textContent)

function addTodo(event, text) {
  event.preventDefault()

  const todoDiv = document.querySelector('#todo-item').content.cloneNode(true)
  todoDiv.querySelector('.todo-item').textContent = todoInput.value

  todoList.append(todoDiv)
}