const enemy = document.querySelector('.enemy')
const lifeValue = document.querySelector('.lives__value')
const difficultyEl = document.querySelector('.difficulty')
let difficultyInd = 0

difficultyEl.addEventListener('change', () => {
  difficultyInd = difficultyEl.selectedIndex
})

class Enemy {
  constructor() {
    this.life = 0
    this.difficulties = [10, 100, 300, 666]
  }

  setDifficulty() {
    this.life = this.difficulties[difficultyInd]
    this.updateLifeElement()  
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
    jaw.style.transform = 'translateY(15px)'
    setTimeout(() => {
      enemy.style.opacity = 1
      jaw.style.transform = 'translateY(0)'
    }, 100);
  }

  isLifeZero() {
    return this.life === 0
  }

  dead() {
    jaw.style.transform = 'translateY(20px)'
    dead_eyes.style.opacity = 1
    hat.style.opacity = 0
    lives.style.visibility = 'hidden'
  }

  live() {
    jaw.style.transform = 'translateY(0)'
    dead_eyes.style.opacity = 0
    hat.style.opacity = 1
    lives.style.visibility = 'visible'
  }
}

export default Enemy

