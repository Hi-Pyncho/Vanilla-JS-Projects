const enemy = document.querySelector('.enemy')

class Enemy {
  constructor(life) {
    this.life = life
  }
  
  decreaseLife() {
    this.life -= 1
  }

  increaseLife() {
    this.life += 1
  }

  set life(value) {
    if(value < 100) {
      console.log('слишком мало')
      return
    }
    this._life = value
  }

  get life() {
    return this._life
  }

  shootEnemy() {
    enemy.style.opacity = .1
    setTimeout(() => {
      enemy.style.opacity = 1
    }, 100);
  }
}

export default Enemy