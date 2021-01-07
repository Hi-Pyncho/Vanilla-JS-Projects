const enemy = document.querySelector('.enemy')
const lifeValue = document.querySelector('.lives__value')
// const difficultyEl = document.querySelector('.difficulty')
// const difficulty = difficultyEl.options[difficultyEl.selectedIndex].value
// const difficultyInd = difficultyEl.selectedIndex
const difficultyEl = document.querySelector('.difficulty')
let difficultyInd = 0

difficultyEl.addEventListener('change', () => {
  difficultyInd = difficultyEl.selectedIndex
})

class Enemy {
  constructor() {
    this.life = 0
    this.difficulties = [100, 300, 666]
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
    setTimeout(() => {
      enemy.style.opacity = 1
    }, 100);
  }

  isLifeZero() {
    return this.life === 0
  }
}

export default Enemy