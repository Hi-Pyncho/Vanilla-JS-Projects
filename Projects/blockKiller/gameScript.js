'use strict';

const yourScore = document.querySelector('.score')
const restartMenu = document.querySelector('.restartMenu')
const canvas = document.querySelector('#myCanvas')
const context = canvas.getContext('2d')

canvas.style.cursor = 'none'

const greenColor = '#01fe03' 
const blackColor = '#191919'

let x = canvas.width / 2
let y = canvas.height - 30
let dx = 4
let dy = -4
let ballRadius = 20
let paddleHeight = 20
let paddleWidth = 170 
let paddleX = (canvas.height - paddleWidth) / 2
let rightPressed = false
let leftPressed = false
let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 145
let brickHeight = 35
let brickPadding = 15
let brickOffsetTop = 60
let brickOffsetLeft = 30
let score = 0
let lives = 3

let bricks = []
for(let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for(let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {x: 0, y: 0, status: 1}
  }
}

function gameStop() {
  x = canvas.width / 2
  y = canvas.height - 30
}

function drawBricks() {
  for(let c = 0; c < brickColumnCount; c++) {
    for(let r = 0; r < brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        context.beginPath()
        context.rect(brickX, brickY, brickWidth, brickHeight)
        context.fillStyle = greenColor
        context.fill()
        context.closePath()
      }
    }
  }
}


document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener("mousemove", mouseMoveHandler, false)

function keyDownHandler(e) {
  if(e.key === 'Right' || e.key === 'ArrowRight')  {
    rightPressed = true
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false
  }
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft
  if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2
  }
}

function gameContinue() {
  if(score % (brickColumnCount * brickRowCount) === 0 && score !== 0) {
    for(let c = 0; c < brickColumnCount; c++) {
      for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r].status = 1
      }
    }
  }
}


function collisionDetection() {
  for(let c = 0; c < brickColumnCount; c++) {
    for(let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r]
      if(b.status == 1) {
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy
          b.status = 0
          score++
        }
      }
    }
  }
}

function drawScore() {
  context.font = '20px FFFForward'
  context.fillStyle = greenColor
  context.fillText('Score: ' + score, 27, 40)
}

function drawLives() {
  context.font = '20px FFFForward'
  context.fillStyle = greenColor
  context.fillText('Lives: ' + lives, canvas.width - 120, 40)
}

function drawPaddle() {
  context.beginPath()
  context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  context.fillStyle = greenColor
  context.fill()
  context.closePath()
}

function drawBall() {
  context.beginPath()
  context.arc(x, y, ballRadius, 0, Math.PI*2)
  context.fillStyle = greenColor;
  context.fill()
  context.closePath()
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawPaddle()
  drawBall()
  drawScore()
  drawLives()
  collisionDetection()
  gameContinue()
  
  if(x + dx > canvas.width - ballRadius  || x + dx < ballRadius ) {
    dx = -dx
  }

  if(y + dy < ballRadius) {
    dy = -dy
  } else if(y + dy > canvas.height - ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy - 0.4
    } else {
      lives--

      if(!lives) {
        restartMenu.style.display = 'flex'
        yourScore.textContent = `YOUR SCORE: ${score}`
        return

      } else {
        x = canvas.width / 2
        y = canvas.height - 30
        dx = 4
        dy = -4
        paddleX = (canvas.width - paddleWidth) / 2
      }
    }
      
  }

  if(rightPressed) {
    paddleX += 7
    if(paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth
    }
  }

  if(leftPressed) {
    paddleX -= 7
    if(paddleX < 0) {
      paddleX = 0
    }
  }

  x += dx
  y += dy

  requestAnimationFrame(draw)
}

const startButton = document.querySelector('.startMenu')

startButton.addEventListener('click', function() {
  startButton.style.display = 'none'
  draw()
})

restartMenu.addEventListener('click', function() {
  restartMenu.style.display = 'none'
  document.location.reload()
})


