export class Rect {
  constructor(options) {
    this.ctx = options.ctx
    this.x = options.x,
    this.y = options.y,
    this.width = options.width,
    this.height = options.height,
    this.color = options.color
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

}

