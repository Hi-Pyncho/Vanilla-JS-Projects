function Snake() {
  this.x = 0
  this.y = 0
  this.xSpeed = scale * 1
  this.ySpeed = 0
  this.fruitEaten = 0
  this.total = 0
  this.tails = []
  this.lives = 3

  this.draw = function() {
    ctx.fillStyle = '#01fe03'

    for(let tail of this.tails) {
      ctx.fillRect(tail.x, tail.y, scale, scale)
    }

    ctx.fillRect(this.x, this.y, scale, scale)
  }

  this.update = function() {
    for(let i = 0; i < this.tails.length - 1; i++) {
      this.tails[i] = this.tails[i + 1]
    }

    this.tails[this.total - 1] = { x: this.x, y: this.y}

    this.x += this.xSpeed
    this.y += this.ySpeed

    if(this.x > canvas.width) {
      this.x = 0
    }
    if(this.x < 0) {
      this.x = canvas.width
    }
    if(this.y > canvas.height) {
      this.y = 0
    }
    if(this.y < 0) {
      this.y = canvas.height
    }
  }

  this.changeDirection = function(direction) {
    switch(direction) {
      case 'ArrowUp':
        this.xSpeed = 0
        this.ySpeed = -scale * 1
        break
      case 'ArrowDown':
        this.xSpeed = 0
        this.ySpeed = scale * 1
        break
      case 'ArrowLeft':
        this.xSpeed = -scale * 1
        this.ySpeed = 0
        break
      case 'ArrowRight':
        this.xSpeed = scale * 1
        this.ySpeed = 0
        break
    }
  }

  this.eat = function(fruit) {
    if(this.x === fruit.x && this.y === fruit.y) {
      this.total++
      return true
    }

    return false
  }

  this.ckeckCollision = function() {
    for(let tail of this.tails) {
      if(this.x === tail.x && this.y === tail.y) {
        this.total = 0
        this.tails = []
        this.lives -= 1
        
      }
    }
  }

  this.snakeDied = function() {
    this.total = 0
    this.tails = []
    this.lives = 3
    this.x = 0
    this.y = 0
  }
}