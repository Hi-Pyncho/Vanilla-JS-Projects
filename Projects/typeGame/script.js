import Enemy from './modules/enemy.js'
import Gun from './modules/gun.js'
import Game from './modules/game.js'
import Word from './modules/word.js'
import './modules/select.js'
import wordArray from './modules/wordsArray.js'

const startBtn = document.querySelector('.start-button')

const game = new Game({
  timeInSeconds: 0
})
const enemy = new Enemy()
const word = new Word({
  words: wordArray
})

startBtn.addEventListener('click', () => {
  enemy.setDifficulty()
  game.startGame()
  word.resetWord()
  enemy.live()
})

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    word.updateInput(letter)

    if (word.isSuccessfulShoot(letter)) {
      Gun.randomShout()
      enemy.shootEnemy()
      word.removeFirstLetter()
      enemy.decreaseLife()
    } else {
      enemy.increaseLife()
      Gun.missFire()
    }
    word.setNextWord()
  }
  if (enemy.isLifeZero()) {
    enemy.dead()
    game.stopTime()
    game.setResultTime()
    
    setTimeout(() => {
      game.resetTime()
      game.gameEnd()
      word.clearWordEl()
    }, 2000);
  }
})
