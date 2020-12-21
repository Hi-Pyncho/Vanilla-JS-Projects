const video = document.querySelector('.screen')
const play = document.querySelector('.btn-play-controls')
const stop = document.querySelector('.btn-stop')
const progress = document.querySelector('.progress')
const volume = document.querySelector('.volume')
const timestamp = document.querySelector('.timestamp')
const playBtn = document.querySelector('.btn-play-controls')
const pauseBtn = document.querySelector('.pause')

video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus)

stop.addEventListener('click', stopVideo)

progress.addEventListener('input', setVideoProgress)
volume.addEventListener('change', setVideoVolume)


function toggleVideoStatus() {
  if(video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function updatePlayIcon() {
  if(video.paused) {
    playBtn.classList.replace('pause', 'play')
  } else {
    playBtn.classList.replace('play', 'pause')
  }
}

function updateProgress() {
  progress.max = Math.floor(video.duration)
  progress.value = video.currentTime

  let minutes = Math.floor(video.currentTime / 60)
  if(minutes < 10) {
    minutes = '0' + String(minutes)
  }

  let seconds = Math.floor(video.currentTime % 60)
  if(seconds < 10) {
    seconds = '0' + String(seconds)
  }

  timestamp.textContent = `${minutes}:${seconds}`
}

function setVideoProgress() {
  video.currentTime = progress.value
}

function stopVideo() {
  video.currentTime = 0
  video.pause()
}

function setVideoVolume() {
  video.volume = volume.value / 100
  console.log(video.volume)
}
