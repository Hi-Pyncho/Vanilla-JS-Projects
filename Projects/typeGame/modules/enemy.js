const enemy = document.querySelector('.enemy')
const lifeValue = document.querySelector('.lives__value')

class Enemy {
  constructor(life) {
    this.life = life
  }
  
  decreaseLife() {
    this.life -= 1
    this.updateLifeElement()
  }

  increaseLife() {
    this.life += 1
    this.updateLifeElement()
  }

  updateLifeElement() {
    lifeValue.textContent = this.life
  }

  set life(value) {
    this._life = value
  }

  get life() {
    return this._life
  }

  shootEnemy() {
    enemy.style.opacity = .4
    setTimeout(() => {
      enemy.style.opacity = 1
    }, 100);
  }

  isLifeZero() {
    return this.life === 0
  }
}

export default Enemy