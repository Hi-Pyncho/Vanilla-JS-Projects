const startbutton = document.querySelector('.start')
const endTimerMessage = document.querySelector('.end-timer-message')
const circle = document.querySelector('.progress-ring__circle')
const relaxSound = document.querySelector('audio')
const playButton = document.querySelector('.icon')
const timer = document.querySelector('.timer')
const answers = endTimerMessage.querySelector('.answers')
const successMessage = endTimerMessage.querySelector('.success')
const question = endTimerMessage.querySelector('.question')

const radius = circle.r.baseVal.value
const circumference = radius * 2 * Math.PI
const startMinutes = 5
let totalTime = startMinutes * 60

circle.style.strokeDasharray = `${circumference} ${circumference}`
circle.style.strokeDashoffset = `${circumference}`

startbutton.addEventListener('click', () => {
  startbutton.style.display = 'none'
  startTimer()
  relaxSound.play()
})

answers.addEventListener('click', (evt) => {
  
  if(evt.target.textContent == 'Yes') {
    successMessage.style.display = 'block'
    question.style.display = 'none'
    answers.style.display = 'none'
  } else if(evt.target.textContent == 'No') {
    endTimerMessage.style.display = 'none'
    relaxSound.play()
    startTimer()
  }
  
})

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset
}

function startTimer() {
  let percents = 0
  let time = totalTime
  const onePercent = +(100 / totalTime).toFixed(2)
  let currentPercent = 0

  let interval = setInterval(() => {
    const minutes = Math.floor(time / 60)
    let seconds = time % 60

    seconds = seconds < 10 ? '0' + seconds : seconds 

    if(time < 0) {
      clearInterval(interval)

      timer.textContent = ''
      endTimerMessage.style.display = 'flex'

      relaxSound.pause();
      relaxSound.currentTime = 0;
    } else {
      currentPercent > 100 ? setProgress(100) : setProgress(currentPercent)
      currentPercent += onePercent
      
      timer.textContent = `${Math.trunc(minutes)}:${seconds}`
      
      time--
    }
    
  }, 1000);
}