const gameTime = document.querySelector('.time')
const gameWindow = document.querySelector('.game-window')
const resultsWindow = gameWindow.querySelector('.game-results')
const resultValue = resultsWindow.querySelector('.game-result__value')

class Game {
  constructor(props) {
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
  
    return `YOUR TIME : ${min}:${sec}`
  }

  startTime() {
    window.timeId = setInterval(() => {
      this.timeInSeconds += 1
      this.updateTimeElement()
    }, 1000);
  }

  resetTime() {
    this.timeInSeconds = 0
    this.updateTimeElement()
  }

  stopTime() {
    clearInterval(timeId)
  }

  updateTimeElement() {
    gameTime.textContent = this.getTime(this.timeInSeconds)
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