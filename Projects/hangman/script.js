const wrongLettersEl = document.querySelector('.wrong-letters-container')
const wordEl = document.querySelector('.word-container')
const popup = document.querySelector('.popup-container')
const playAgainBtn = document.querySelector('.play-button')
const finalMessage = document.querySelector('.final-message')
const notification = document.querySelector('.notification-container')

const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'wizard']

let selectedWord = words[Math.floor(Math.random() * words.length)]
// let selectedWord = 'wigard'

// const correctLetters = ['w', 'i', 'g', 'a', 'r', 'd']
const correctLetters = ['w', 'i', 'g', 'a', 'r', 'd']
const wrongLetters = []

function displayWords() {
  wordEl.innerHTML =  `
    ${selectedWord
      .split('')
      .map(l => `
        <span class='letter'> 
          ${correctLetters.includes(l) ? l : ''}
        </span>
      `)
      .join('')
    }
  `

  
}

function gameEnd() {
  const innerWord = wordEl.innerText.replace(/\n/g, '')
  
  if(innerWord === selectedWord) {
    finalMessage.innerHTML = `Congratulations!<br> You won!`
    popup.style.display = 'flex'
  }
}

displayWords()