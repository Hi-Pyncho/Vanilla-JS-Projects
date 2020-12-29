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
const correctLetters = []
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
  
  gameEnd()
}

function gameEnd() {
  const innerWord = wordEl.innerText.replace(/\n/g, '')
  
  if(innerWord === selectedWord) {
    finalMessage.innerHTML = `Congratulations!<br> You won!`
    popup.style.display = 'flex'
  }
}

window.addEventListener('keydown', e => {
  // console.log(e.keyCode)
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key

    if(selectedWord.includes(letter) && !correctLetters.includes(letter)) {
      correctLetters.push(letter)

      displayWords()
    }
  }
})

displayWords()