import * as tetro from './tetrominoes.js'

const buttons = document.querySelector('.playButtons')
const scoreValue = document.querySelector('.score-value')
const gameMenu = document.querySelector('.gameMenu')
const gameEnd = document.querySelector('.gameEnd')

const canvas = document.querySelector('#tetris')
const ctx = canvas.getContext('2d')
const cvsNext = document.querySelector('#next')
const ctxNext = cvsNext.getContext('2d')

const green = '#01fe03'
const black = '#191919'

const SQ = 20 //squareSize
const ROW = 20
const COLUMN = 10
const VACANT = black // color of an empty square
let score = 0
let gameOver = true
let index = 0

const PIECES = [tetro.Z, tetro.S, tetro.T, tetro.O, tetro.I, tetro.L, tetro.J]
let board = []

class Piece {
  constructor(tetromino, color) {
    this.tetromino = tetromino
    this.tetrominoN = 0
    this.index = 0
    this.activeTetromino = this.tetromino[this.tetrominoN]
    this.color = color
    this.x = 3
    this.y = -3
  }

  fill(color) {
    for(let r = 0; r < this.activeTetromino.length; r++) {
      for(let c = 0; c < this.activeTetromino.length; c++) {
        if(this.activeTetromino[r][c]) {
          drawSquare(this.x + c, this.y + r, color)
        }
      }
    }
  }

  draw() {
    this.fill(this.color)
  }

  undraw() {
    this.fill(VACANT)
  }

  moveLeft() {
    if(!this.collision(-1, 0, this.activeTetromino)) {
      this.undraw()
      this.x--
      this.draw()
    }
  }

  moveRight() {
    if(!this.collision(1, 0, this.activeTetromino)) {
      this.undraw()
      this.x++
      this.draw()
    } 
  }

  moveDown() {
    if(piece.y === -3) {
      index++
    }
    if(!this.collision(0, 1, this.activeTetromino)) {
      this.undraw()
      this.y++
      this.draw()
    } else {
      this.lock()
      removeFullRows()
      drawBoard()
      setScoreValue()
      createNextPieces()
      this.drawNext(piecesArray[index + 1].activeTetromino)
    }
    
  }

  rotate() {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length]
    let kick = 0

    // move the piece to the left or to the right from the wall
    if(this.collision(0, 0, nextPattern)) {
      this.x > COLUMN / 2 ? kick = -1 : kick = 1 
    }

    if(!this.collision(kick, 0, nextPattern)) {
      this.undraw()
      this.x += kick
      this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length
      this.activeTetromino = this.tetromino[this.tetrominoN]
      this.draw()
    }
  }

  lock() {
    for(let r = 0; r < this.activeTetromino.length; r++) {
      for(let c = 0; c < this.activeTetromino.length; c++) {
        // skip the vacant squares
        if(!this.activeTetromino[r][c]) continue
        // pieces to lock on top = game over
        if(this.y + r < 0) {
          gameIsOver()
          break
        }
         // lock the piece
        board[this.y + r][this.x + c] = this.color
      }
    }
  }

  collision(x, y, piece) {
    for(let r = 0; r < piece.length; r++) {
      for(let c = 0; c < piece.length; c++) {
        if(!piece[r][c]) continue

        let newX = this.x + c + x
        let newY = this.y + r + y

        if(newX < 0 || newX >= COLUMN || newY >= ROW) {
          return true
        }

        if(newY < 0) continue
      
        if(board[newY][newX] !== VACANT) {
          return true
        }
      }
    }
    
    return false
  }

  drawNext(piece) {
    this.clearNext()

    for(let r = 0; r < piece.length; r++) {
      for(let c = 0; c < piece.length; c++) {
        if(piece[r][c]) {
          const shiftCoord = piece.length === 3 ? 2*SQ : SQ  
          const shiftX = piece.length === 3 ? SQ + 10 : SQ 
  
          ctxNext.fillStyle = green
          ctxNext.fillRect(SQ*c + shiftX, SQ*r + shiftCoord, SQ, SQ )
        }
      }
    }
  }

  clearNext() {
    ctxNext.fillStyle = black
    ctxNext.fillRect(0, 0, 110, 110)
  }
}

let piecesArray = []

for(let i = 0; i < 5; i++) {
  piecesArray.push(randomPiece())
}

let piece = piecesArray[0]

gameMenu.addEventListener('click', (evt) => {
  if(evt.target.id === 'startGame') {
    startGame.style.display = 'none'
    gameMenu.style.display = 'none'
    gameOver = false
    piece.draw()
    createBoard()
    drawBoard()
    drop()
    piece.drawNext(piecesArray[index + 1].activeTetromino)
  }
  if(evt.target.id === 'retryButton') {
    gameMenu.style.display = 'none'
    resetGame()
    gameOver = false
    drop()
  }
})

document.addEventListener('keydown', (evt) => {
  if([32, 37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
    evt.preventDefault()
  }
  control(evt)
})

buttons.addEventListener('click', (evt) => {
  controlButtons(evt)
})

function control(evt) {
  switch (evt.keyCode) {
    case 37: {
      piece.moveLeft()
      hoverAnimation(left)
    }
    break
    case 38: {
      piece.rotate()
      hoverAnimation(up)
    }
    break
    case 39: {
      piece.moveRight()
      hoverAnimation(right)
    }
    break
    case 40: {
      piece.moveDown()
      hoverAnimation(down)
    }
  }
}

function controlButtons(evt) {
  switch (evt.target.id) {
    case 'left': piece.moveLeft() 
    break
    case 'up': piece.rotate()
    break
    case 'right': piece.moveRight()
    break
    case 'down': piece.moveDown()
  }
}

let dropStart = Date.now()
function drop() {
  
  let now = Date.now()
  let delta = now - dropStart

  if(delta > 1000) {
    piece.moveDown()
    dropStart = Date.now()
  }
  
  if(!gameOver) {
    requestAnimationFrame(drop)
  }
}

function drawSquare(x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(SQ*x, SQ*y, SQ, SQ)
}

function randomPiece() {
  let randomN = Math.floor(Math.random() * PIECES.length)

  return new Piece(PIECES[randomN], green)
}

function createBoard() {
  for(let r = 0; r < ROW; r++) {
    board[r] = []
    for(let c = 0; c < COLUMN; c++) {
      board[r][c] = VACANT
    }
  }  
}

function drawBoard() {
  for(let r = 0; r < ROW; r++) {
    for(let c = 0; c < COLUMN; c++) {
      drawSquare(c, r, board[r][c])
    }
  }
}

function hoverAnimation(direction) {
  direction.style.animation = 'hover .2s linear'
  let timeout = setTimeout(() => {
    direction.style.animation = ''
    clearTimeout(timeout)
  }, 100);
}

function resetGame() {
  createBoard()
  drawBoard()
  score = 0
  scoreValue.textContent = score
  piece.x = 3
  piece.y = -3
}

function createNextPieces() {
  piecesArray.push(randomPiece())
  piece = piecesArray[index]
}

function gameIsOver() {
  score_Value.textContent = score
  gameEnd.style.display = 'flex'
  gameMenu.style.display = 'flex'
  gameOver = true
}

function increaseScore() {
  score += 10
}

function setScoreValue() {
  scoreValue.textContent = score
}

function removeFullRows() {
  for(let r = 0; r < ROW; r++) {
    let isRowFull = true
    for(let c = 0; c < COLUMN; c++) {
      isRowFull = isRowFull && board[r][c] !== VACANT
    }   
  
    if(isRowFull) {
      // if the row is full
      // we move down all the rows above it
      for(let y = r; y > 1; y--) {
        for(let c = 0; c < COLUMN; c++) {
          board[y][c] = board[y-1][c]
        }
      }
      // the top row board[0][..] has no row above it
      for(let c = 0; c < COLUMN; c++) {
        board[0][c] = VACANT
      }

      increaseScore()
    }
  }
}







