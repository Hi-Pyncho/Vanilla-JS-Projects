const bookTitle = document.querySelector('#title')
const bookAuthor = document.querySelector('#author')
const bookYear = document.querySelector('#year')
const BookList = document.querySelector('.book-list')

class Book {
  constructor(title, author, year) {
    this.title = title
    this.author = author
    this.year = year
  }
}

class Store {
  static getBooks() {
    let books

    if(localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  static addBook(book) {
    const books = Store.getBooks()

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(title, author, year) {
    const books = Store.getBooks()

    books.forEach((book, index) => {
      if(book.year === year
        && book.title === title
        && book.author === author) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

class UI {
  static displayBooks() {
    

    const books = Store.getBooks()

    books.forEach((book) => UI.addBookToList(book))
  }

  static addBookToList(book) {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td><button class='deleteBtn'>X</button></td>
    `

    BookList.appendChild(row)
  }

  static deleteBook(element) {
    if(element.classList.contains('deleteBtn')) {
      element.parentElement.parentElement.remove()
      
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div')

    div.className = `alert alert-${className}`
    div.textContent = `${message}`

    const wrapper = document.querySelector('.wrapper')
    const form = document.querySelector('#book-form')

    wrapper.insertBefore(div, form)
  }

  static clearFields() {
    bookTitle.value = ''
    bookAuthor.value = ''
    bookYear.value = ''
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks)

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault()

  const title = bookTitle.value
  const author = bookAuthor.value
  const year = bookYear.value

  if(title === '' || author === '' || year === '') {
    UI.showAlert('Please fill in all fields', 'danger')
  } else {
    const book = new Book(title, author, year)

    UI.addBookToList(book)

    Store.addBook(book)

    UI.showAlert('Book Added', 'success')

    UI.clearFields()
  }

  
})

BookList.addEventListener('click', (e) => {
  UI.deleteBook(e.target)

  const title = e.target.parentElement.parentElement.children[0].textContent
  const author = e.target.parentElement.parentElement.children[1].textContent
  const year = e.target.parentElement.parentElement.children[2].textContent
  
  Store.removeBook(title, author, year)

  UI.showAlert('Book Removed', 'success')
})