import * as tetro from './tetrominoes.js'

const canvas = document.querySelector('#tetris')
const ctx = canvas.getContext('2d')

const cvsNext = document.querySelector('#next')

const green = '#01fe03'
const black = '#191919'

const SQ = 20 //squareSize
const ROW = 20
const COLUMN = 10
const VACANT = black // color of an empty square
let score = 0


const PIECES = [tetro.Z, tetro.S, tetro.T, tetro.O, tetro.I, tetro.L, tetro.J]
let board = []

class Piece {
  constructor(tetromino, color) {
    this.tetromino = tetromino
    this.tetrominoN = 0
    this.activeTetromino = this.tetromino[this.tetrominoN]
    this.color = color
    this.x = 3
    this.y = -2
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
    if(!this.collision(0, 1, this.activeTetromino)) {
      this.undraw()
      this.y++
      this.draw()
    } else {
      this.lock()
      piece = randomPiece()
    }
    
  }

  rotate() {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length]
    let kick = 0

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
        if(!this.activeTetromino[r][c]) continue

        if(this.y + r < 0) {
          alert('Game Over')
          gameOver = true
          break
        }

        board[this.y + r][this.x + c] = this.color
      }
    }

    for(let r = 0; r < ROW; r++) {
      let isRowFull = true
      for(let c = 0; c < COLUMN; c++) {
        isRowFull = isRowFull && board[r][c] !== VACANT
      }   
    
      if(isRowFull) {
        for(let y = r; y > 1; y--) {
          for(let c = 0; c < COLUMN; c++) {
            board[y][c] = board[y-1][c]
          }
        }
        for(let c = 0; c < COLUMN; c++) {
          board[0][c] = VACANT
        }
        score += 10
      }
    }

    drawBoard()

    //update score.textContent element
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
}





createBoard()
drawBoard()

let piece = randomPiece()


piece.draw()

let dropStart = Date.now()
let gameOver = false
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

drop()

document.addEventListener('keydown', (evt) => {
  if([32, 37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
    evt.preventDefault()
  }

  control(evt)
})

function control(evt) {
  // to stop moving piece down, when key is pressed
  // dropStart = Date.now()
  switch (evt.keyCode) {
    case 37: piece.moveLeft() 
    break
    case 38: piece.rotate()
    break
    case 39: piece.moveRight()
    break
    case 40: piece.moveDown()
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
    // board[r] = []
    for(let c = 0; c < COLUMN; c++) {
      // board[r][c] = VACANT
      drawSquare(c, r, board[r][c])
    }
  }
}
