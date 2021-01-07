import Enemy from './modules/enemy.js'
import Gun from './modules/gun.js'
import Game from './modules/game.js'
import Word from './modules/word.js'

const startBtn = document.querySelector('.start-button')

const textInput = document.querySelector('.word')



const game = new Game({
  score: 0,
  timeInSeconds: 0
})
const enemy = new Enemy()
const gun = new Gun()
const word = new Word({
  words: ['wizard', 'programm', 'skull', 'computer']
})



startBtn.addEventListener('click', () => {
  enemy.setDifficulty()
  console.log(enemy)
  game.startGame()
  word.setBulletWord()
})



window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    textInput.textContent = letter

    console.log(enemy.life)

    if (word.isSuccessfulShoot(letter)) {
      Gun.randomShout()
      enemy.shootEnemy()
      word.removeFirstLetter()
      enemy.decreaseLife()
    } else {
      enemy.increaseLife()
    }
    word.setNextWord()
  }
  if (enemy.isLifeZero()) {
    console.log('end!')
    game.setResultTime()
    game.gameEnd()
    game.resetTime()
  }
})


document.querySelector('.test').addEventListener('click', () => {
  Gun.randomShout()
})


const select = document.querySelector('.select-section');


select.addEventListener('click', () => selectEvent())

const selectEvent = () => {
  if (event.type == 'click') {
    if (select.classList.contains('closed')) {
      select.classList.replace('closed', 'opened');
    } else {
      select.classList.replace('opened', 'closed');
    }
  }
}



// console.log(difficulty.options[difficulty.options.selectedIndex].value)
