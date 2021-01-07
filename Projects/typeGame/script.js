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
  // word.setBulletWord()
  word.resetWord()
  enemy.live()
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




const fire = new Audio('./audio/shoot.mp3')
const empty = new Audio('./audio/empty.mp3')
document.querySelector('.test').addEventListener('click', () => {
  empty.currentTime = 0
  empty.play()
})