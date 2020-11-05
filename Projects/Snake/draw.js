const score = document.querySelector('.score-num')
const lives = document.querySelector('.lives-num')
const startMenu = document.querySelector('.startMenu')
const restartMenu = document.querySelector('.restartMenu')
const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
const scale = 20;
const rows = canvas.height / scale
const columns = canvas.width / scale

let snake
let fruit

startMenu.addEventListener('click', function() {
  startMenu.style.display = 'none'
  setup()
})

restartMenu.addEventListener('click', function() {
  restartMenu.style.display = 'none'
  setup()
})

function setup() {
  snake = new Snake()
  fruit = new Fruit()
  
  fruit.pickLocation()

  let interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    fruit.draw()
    snake.update()
    snake.draw()

    if(snake.eat(fruit)){
      fruit.pickLocation()
    }

    snake.ckeckCollision()

    score.textContent = snake.total
    lives.textContent = snake.lives

    if(noMoreLives(snake.lives)) {
      snake.snakeDied()
      clearInterval(interval)
      restartMenu.style.display = 'flex'
    }

  }, 250)
}

window.addEventListener('keydown', evt => {
  if(['ArrowDown', 'ArrowUp'].indexOf(evt.key) > -1) {
    evt.preventDefault();
  }
  
  const direction = evt.key

  snake.changeDirection(direction)
})

function noMoreLives(lives) {
  if(lives === 0) {
    return true
  }
}



