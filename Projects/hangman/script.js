const wrongLettersEl = document.querySelector('.wrong-letters-container')
const wordEl = document.querySelector('.word-container')
const popup = document.querySelector('.popup-container')
const playAgainBtn = document.querySelector('.play-button')
const fintalMessage = document.querySelector('.final-message')
const notification = document.querySelector('.notification-container')

const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'wizard']

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = []
const wrongLetters = []

