const digitalButton = document.querySelector('.digital')
const analogButton = document.querySelector('.analog')
const digitalClock = document.querySelector('.digitalClock')
const analogClock = document.querySelector('.analogClock')

function digitalClockRun() {
  const hours = document.querySelector('#hours')
  const minutes = document.querySelector('#minutes')
  const seconds = document.querySelector('#seconds')
  const ampm = document.querySelector('#ampm')
  
  let h = new Date().getHours()
  let m = new Date().getMinutes()
  let s = new Date().getSeconds()
  let am = 'AM'

  if(h > 12) {
    h = h - 12
    am = 'PM'
  }

  h = (h < 10) ? '0' + h : h
  m = (m < 10) ? '0' + m : m
  s = (s < 10) ? '0' + s : s

  hours.textContent = h
  minutes.textContent = m
  seconds.textContent = s
  ampm.textContent = am
}

function analogClockRun() {
  const degree = 6;
  const hours = document.querySelector('.hr')
  const minutes = document.querySelector('.mn')
  const seconds = document.querySelector('.sc')

  let day = new Date()
  let hh = day.getHours() * 30
  let mm = day.getMinutes() * degree
  let ss = day.getSeconds() * degree

  hours.style.transform = `rotateZ(${(hh) + (mm/12)}deg)`
  minutes.style.transform = `rotateZ(${mm}deg)`
  seconds.style.transform = `rotateZ(${ss}deg)`
}

let digitalClockInterval = setInterval(digitalClockRun, 1000)

let analogClockInterval = setInterval(analogClockRun, 1000)

digitalButton.addEventListener('click', function() {
  if(digitalClock.classList.contains('hide')) {
    digitalClock.classList.remove('hide')
    analogClock.classList.add('hide')
    digitalButton.classList.add('current')
    analogButton.classList.remove('current')
  }
})

analogButton.addEventListener('click', function() {
  if(analogClock.classList.contains('hide')) {
    analogClock.classList.remove('hide')
    digitalClock.classList.add('hide')
    analogButton.classList.add('current')
    digitalButton.classList.remove('current')
  }
})

