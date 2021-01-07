const firstRevolver = document.querySelector('.revolver1')
const secondRevolver = document.querySelector('.revolver2')

class Gun {
  static animateFirstGun() {
    firstRevolver.classList.add('shout1')
    bum1.style.opacity = 1
    setTimeout(() => {
      firstRevolver.classList.remove('shout1')
      bum1.style.opacity = 0
    }, 200);
  }

  static animateSecondGun() {
    secondRevolver.classList.add('shout2')
    bum2.style.opacity = 1
    setTimeout(() => {
      secondRevolver.classList.remove('shout2')
      bum2.style.opacity = 0
    }, 200);
  }

  static randomShout() {
    shoot.currentTime = 0
    shoot.play()
    const randomNum = Math.random()
    randomNum < 0.5 ? this.animateFirstGun() : this.animateSecondGun()
  }

  static missFire() {
    empty.currentTime = 0
    empty.play()
  }
}

export default Gun