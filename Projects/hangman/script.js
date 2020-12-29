const wrongLettersEl = document.querySelector('.wrong-letters')
const wordEl = document.querySelector('.word-letters')
const popup = document.querySelector('.popup-container')
const playAgainBtn = document.querySelector('.play-button')
const finalMessage = document.querySelector('.final-message')
const notification = document.querySelector('.notification-container')
const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'wizard']

let selectedWord = getRandomWord(words)

let correctLetters = []
let wrongLetters = []

;(function setup() {
  displayWords()
})()

function updateCorrectLetters(letter) {
  if(!correctLetters.includes(letter)) {
    correctLetters.push(letter)
    displayWords()
  } else {
    showNotification()
  }
}

function updateWrongLetters(letter) {
  if(!wrongLetters.includes(letter)) {
    wrongLetters.push(letter)
    updateWrongLettersElement()
    updateFigureParts()
  } else {
    showNotification()
  }
}

window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key

    if(selectedWord.includes(letter)) {
      updateCorrectLetters(letter)
    } else {
      updateWrongLetters(letter)
    }
  }

  gameEnd()
})

playAgainBtn.addEventListener('click', () => {
  correctLetters = []
  wrongLetters = []
 
  selectedWord = getRandomWord(words)
  displayWords()
  updateWrongLettersElement()
  updateFigureParts()
  hide(popup)
})

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
  
  setTimeout(() => {
    if(innerWord === selectedWord) {
      finalMessage.innerHTML = `Congratulations!<br> You won!`
      show(popup)
    }
  
    if(wrongLetters.length === figureParts.length) {
      finalMessage.textContent = 'You lost!'
      show(popup)
    }
  }, 1000);
}

function updateWrongLettersElement() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(l => `<span>${l}</span>`)}
  `
}

function updateFigureParts() {
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    if(index < errors) {
      show(part)
    } else {
      hide(part)
    }
  })
}

function showNotification() {
  notification.classList.add('showAndHide')

  setTimeout(() => {
    notification.style.transition = 'opacity 1s ease'
    notification.classList.remove('showAndHide')
  }, 1000);
}

function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)]
}

function hide(element) {
  element.style.display = 'none'
}

function show(element, display = 'flex') {
  element.style.display = display
}
