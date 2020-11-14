const circle = document.querySelector('.progress-ring__circle')
const radius = circle.r.baseVal.value
const circumference = radius * 2 * Math.PI
const relaxSound = document.querySelector('audio')
const playButton = document.querySelector('.icon')
const timer = document.querySelector('.timer')
const startMinutes = 1
let totalTime = 60 //startMinutes * 60

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset
}

circle.style.strokeDasharray = `${circumference} ${circumference}`
circle.style.strokeDashoffset = `${circumference}`

// setProgress(98)

// input.addEventListener('change', function(e) {
//   if (input.value < 101 && input.value > -1) {
//     setProgress(input.value);
//   }  
// })

// playButton.addEventListener('click', function() {
  
// })

// let timerId = setInterval(function () {
//   seconds = MINUTES * 60 // Получаем секунды
//   minutes = MINUTES / 60 % 60 // Получаем минуты
//   // Условие если время закончилось то...
//   if (minutes <= 0) {
//       // Таймер удаляется
//       clearInterval(timerId);
//       // Выводит сообщение что время закончилось
//       alert("Время закончилось");
//   } else { // Иначе
//       // Создаём строку с выводом времени
//       let strTimer = `${Math.trunc(minutes)}:${seconds}`;
//       // Выводим строку в блок для показа таймера
//       timer.textContent = strTimer;
//   }
//   --minutes; // Уменьшаем таймер
// }, 1000)

let percents = 0
let currentPercent = totalTime
let time = totalTime

let interval = setInterval(() => {
  const minutes = Math.floor(time / 60)
  let seconds = time % 60

  seconds = seconds < 10 ? '0' + seconds : seconds 

  if(time < 0) {
    clearInterval(interval)
    alert('done!')
  } else {
    showProgress(time)
    timer.textContent = `${Math.trunc(minutes)}:${seconds}`
    time--
  }
  
}, 1000);

function showProgress(time) {
  const onePercent = totalTime / 100
  
  if(time < currentPercent) {
    currentPercent = +(currentPercent - onePercent).toFixed(1)
    percents++
    setProgress(percents)
    console.log(percents, time, currentPercent)
  } else {
    // setProgress(percents)
    console.log('hhhhhh')
  }
}



// let num = 0
// let count = 10

// let interval = setInterval(() => {
//   if(count <= 0) {
//     clearInterval(interval)
//   } else {
//     num = num + 0.6
//     count--
//     console.log(Math.round(num))
//   }
  
  
// }, 1000);