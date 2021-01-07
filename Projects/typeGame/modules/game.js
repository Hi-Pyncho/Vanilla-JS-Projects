const gameTime = document.querySelector('.time')
// const gameScore = document.querySelector('.score')

const gameWindow = document.querySelector('.game-window')


const resultsWindow = gameWindow.querySelector('.game-results')
const resultValue = resultsWindow.querySelector('.game-result__value')

class Game {
  constructor(props) {
    
    this.score = props.score
    this.timeInSeconds = props.timeInSeconds
  }

  startGame() {
    gameWindow.style.display = 'none'
    this.startTime()
  }

  getTime(seconds) {
    let min = Math.floor(seconds / 60)
    min = min < 10 ? '0' + min : min
    
    let sec = seconds % 60
    sec = sec < 10 ? '0' + sec : sec
  
    return `TIME : ${min}:${sec}`
  }

  increaseScore() {
    this.score += 5
    this.updateScoreElement()
  }

  updateScoreElement() {
    gameScore.textContent = `SCORE : ${this.score}`
  }

  startTime() {
    window.timeId = setInterval(() => {
      this.timeInSeconds += 1
      this.updateTimeElement()
    }, 1000);
  }

  resetTime() {
    clearInterval(timeId)
    this.timeInSeconds = 0
    this.updateTimeElement()
  }

  updateTimeElement() {
    gameTime.textContent = this.getTime(this.timeInSeconds)
  }

  gameReset() {
    this.score = 0
    this.timeInSeconds = 0
    enemy.life = 100
    currentWord = getRandomWord()
    setBulletWord(currentWord)
  }

  setResultTime() {
    resultValue.textContent = this.getTime(this.timeInSeconds)
  }

  gameEnd() {
    gameWindow.style.display = 'flex'
    resultsWindow.style.display = 'flex'
  }
}

export default Game