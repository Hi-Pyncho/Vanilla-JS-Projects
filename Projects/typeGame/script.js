import Enemy from './modules/enemy.js'
import Gun from './modules/gun.js'
import Game from './modules/game.js'
import Word from './modules/word.js'

const textInput = document.querySelector('.word')



const game = new Game({
  score: 0,
  timeInSeconds: 0
})
const enemy = new Enemy(5)
const gun = new Gun()
const word = new Word({
  words: ['wizard', 'programm', 'skull', 'computer']
})




word.setBulletWord()

window.addEventListener('keydown', (e) => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    textInput.textContent = letter
    
    console.log(enemy.life)
    
    if(word.isSuccessfulShoot(letter)) {
      Gun.randomShout()
      enemy.shootEnemy()
      word.removeFirstLetter()
      enemy.decreaseLife()
    } else {
      enemy.increaseLife()
    }
    word.setNextWord()
  }
  if(enemy.isLifeZero()) {
    console.log('end!')
  }
})


document.querySelector('.test').addEventListener('click', () => {
  Gun.randomShout()
})

