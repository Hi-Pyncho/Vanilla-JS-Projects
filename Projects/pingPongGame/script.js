import {Rect} from './components/rectangle.js'
import {Circle} from './components/circle.js'

const comScoreValue = document.querySelector('.computerScore')
const userScoreValue = document.querySelector('.userScore')
const gameEndElement = document.querySelector('.gameEnd')
const gameEndMessage = gameEndElement.querySelector('.gameEnd-message')
const retryButton = gameEndElement.querySelector('.button-retry')
const startButton = document.querySelector('.start .icon')

const canvas = document.querySelector('#pong')
const ctx = canvas.getContext('2d')

const green = '#01fe03'
const black = '#191919'

const FPS = 50
const scoreToWin = 5
const computerLevel = 0.08
let userScore = 0
let comScore = 0
let interval;

let hit = new Audio()
let wall = new Audio()
let userScoreSound = new Audio()
let comScoreSound = new Audio()

hit.src = "sounds/hit.mp3"
wall.src = "sounds/wall.mp3"
comScoreSound.src = "sounds/comScore.mp3"
userScoreSound.src = "sounds/userScore.mp3"

createScoreItems(false, comScoreValue)
createScoreItems(true, userScoreValue)

const userPaddle = new Rect({
  ctx: ctx,
  x: 0,
  y: canvas.height / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: green,
  backgroundColor: black
})

const comPaddle = new Rect ({
  ...userPaddle,
  x: canvas.width - userPaddle.width,
  y: canvas.height / 2 - userPaddle.height / 2
})

const net = new Rect({
  ...userPaddle,
  x: canvas.width / 2 - 2 / 2,
  y: 0,
  height: 10,
  width: 4
})

const ball = new Circle({
  ctx: ctx,
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  color: green,
  velocityX: 5,
  velocityY: 5,
  speed: 5
})

function gameUpdate() {
  scoreUpdate()
  ballMove()
  comAI()
}

function gameRender() {
  clearCanvas()
  drawNet()
  comPaddle.draw()
  ball.draw()
  userPaddle.draw()
}

function game() {
  gameRender()
  gameUpdate()
  gameEnd()
}

startButton.addEventListener('click', () => {
  startButton.parentElement.style.display = 'none'
  interval = setInterval(game, 1000/FPS)
})

retryButton.addEventListener('click', () => {
  resetGame()
  gameEndElement.style.display = 'none'
  interval = setInterval(game, 1000/FPS)
})

canvas.addEventListener('mousemove', movePaddle)

function ballMove() {
  ballUpdatePos()
  ballCollision()
}

function ballUpdatePos() {
  ball.x += ball.velocityX
  ball.y += ball.velocityY
    if(ball.y + ball.radius > canvas.height ||
       ball.y - ball.radius < 0) {
        ball.velocityY = - ball.velocityY
        wall.play()
    } 
}

function ballCollision() {
  let player = (ball.x < canvas.width / 2) ? userPaddle : comPaddle

  if(collision(ball, player)) {
    hit.play()
    let collidePoint = (ball.y - (player.y + player.height / 2))
    collidePoint = collidePoint / (player.height / 2)

    let angleRad = (Math.PI / 4) * collidePoint

    let direction = (ball.x < canvas.width / 2) ? 1 : -1

    ball.velocityX = direction * ball.speed * Math.cos(angleRad)
    ball.velocityY = direction * ball.speed * Math.sin(angleRad)

    ball.speed += 0.3
  }
}

function collision(ball, player) {
  player.top = player.y
  player.bottom = player.y + player.height
  player.left = player.x
  player.right = player.x + player.width

  ball.top = ball.y - ball.radius
  ball.bottom = ball.y + ball.radius
  ball.left = ball.x - ball.radius
  ball.right = ball.x + ball.radius

  return ball.right > player.left &&
         ball.left < player.right &&
         ball.bottom > player.top &&
         ball.top < player.bottom
}

function comAI() {
  comPaddle.y += (ball.y - (comPaddle.y + comPaddle.height / 2)) * computerLevel
}

function movePaddle(evt) {
  let rect = canvas.getBoundingClientRect()
  
  if(userPaddle.y < 0) {
    userPaddle.y = 0
  } else if(userPaddle.y > canvas.height - userPaddle.height) {
    userPaddle.y = canvas.height - userPaddle.height
  } else {
    userPaddle.y = evt.clientY - rect.top - userPaddle.height / 2
  }
}

function scoreUpdate() {
  if(ball.x - ball.radius < 0) {
    comScoreSound.play()
    comScore++
    comScoreValue.children[comScore - 1].classList.add('active')
    resetBall()
  } else if(ball.x + ball.radius > canvas.width) {
    userScoreSound.play()
    userScore++
    userScoreValue.children[userScore - 1].classList.add('active')
    resetBall()
  }
}

function createScoreItems(inverse, element) {
  const scoreItem = document.createElement('div')
  scoreItem.classList.add('scoreItem')

  for(let i = scoreToWin; i > 0; i--) {
    if(inverse) scoreItem.style.order = i
    element.append(scoreItem.cloneNode(true))
  }
}

function drawNet(){
  ctx.fillStyle = green
  for(let i = 0; i <= canvas.height; i+=15){
      ctx.fillRect(net.x, net.y + i, net.width, net.height);
  }
}

function clearCanvas() {
  ctx.fillStyle = black
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function resetBall() {
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.speed = 5
  ball.velocityX = - ball.velocityX
}

function resetGame() {
  userPaddle.x = 0
  userPaddle.y = canvas.height / 2 - 100 / 2
  comPaddle.x = canvas.width - userPaddle.width,
  comPaddle.y = canvas.height / 2 - userPaddle.height / 2
  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  userScore = 0
  comScore = 0

  for(let item of Array.from(userScoreValue.children)) {
    item.classList.remove('active')
  }

  for(let item of Array.from(comScoreValue.children)) {
    item.classList.remove('active')
  }
}

function gameEnd() {
  console.log(comScore, scoreToWin)
  if(userScore === scoreToWin) {
    console.log('userWin')
    gameEndElement.style.display = 'flex'
    gameEndMessage.textContent = 'You Win!'
    clearInterval(interval)
  } else if(comScore === scoreToWin) {
    console.log('comWIn')
    gameEndElement.style.display = 'flex'
    gameEndMessage.textContent = 'You Lose!'
    clearInterval(interval)
  }
}




