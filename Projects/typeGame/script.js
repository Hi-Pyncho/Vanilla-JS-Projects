
const textInput = document.querySelector('.word')



// const firstRevolver = document.querySelector('.revolver1')
// const secondRevolver = document.querySelector('.revolver2')

import Enemy from './modules/enemy.js'
import Gun from './modules/gun.js'
import Game from './modules/game.js'
import Word from './modules/word.js'

const game = new Game({
  score: 0,
  timeInSeconds: 0
})

const enemy = new Enemy(111)
const gun = new Gun()
const word = new Word({
  words: ['wizard', 'programm', 'skull', 'computer']
})

// console.log(enemy.life)

// game.startTime()



// const wordLength = 11







word.setBulletWord()








// let currentWord = getRandomWord()


// setBulletWord(currentWord)


window.addEventListener('keydown', (e) => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    textInput.textContent = letter
    word.shootLetter(letter)
    word.setNextWord()
  }
})



































document.querySelector('.test').addEventListener('click', () => {
  game.resetTime()
})

// setInterval(() => {
//   timeInSeconds += 1
//   updateTimeElement()
// }, 1000);



//////////WEAPON



// function animateFirstGun() {
//   firstRevolver.classList.add('shout1')
//   bum1.style.opacity = 1
//   setTimeout(() => {
//     firstRevolver.classList.remove('shout1')
//     bum1.style.opacity = 0
//   }, 200);
// }













////////////ENEMY






