import {Rect} from './rectangle.js'

export class Circle extends Rect {
  constructor(options) {
    super(options)
    this.radius = options.radius
    this.startAngle = 0
    this.endAngle = Math.PI * 2
    this.velocityX = options.velocityX
    this.velocityY = options.velocityY
    this.speed = options.speed
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle)
    this.ctx.closePath()
    this.ctx.fill()
  }

}
