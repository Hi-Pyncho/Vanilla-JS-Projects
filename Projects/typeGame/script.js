import Enemy from './modules/enemy.js'
import Gun from './modules/gun.js'
import Game from './modules/game.js'
import Word from './modules/word.js'
import './modules/select.js'

const startBtn = document.querySelector('.start-button')
const textInput = document.querySelector('.word')

const game = new Game({
  score: 0,
  timeInSeconds: 0
})
const enemy = new Enemy()
const word = new Word({
  words: ['wizard', 'programm', 'skull', 'computer']
})



startBtn.addEventListener('click', () => {
  enemy.setDifficulty()
  console.log(enemy)
  game.startGame()
  word.resetWord()
  enemy.live()
})

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    textInput.textContent = letter

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
    console.log('end!')
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








