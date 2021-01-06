const bulletContainer = document.querySelector('.text-bullets')

class Word {
  constructor(props) {
    this.words = props.words
    this.currentWord = this.getRandomWord()
    this.wordLength = 11
  }

  getRandomWord() {
    return this.words[Math.floor(Math.random() * this.words.length)]
  }

  setBulletWord() {
    for(let l of this.currentWord) {
      bulletContainer.append(this.getBulletLetter(l))
    }
  }

  getBulletLetter(letter) {
    const bullet = document.querySelector('#bullet-template').content.cloneNode(true)
    const bulletLetter = bullet.querySelector('.bullet-letter')
    bulletLetter.textContent = letter
    return bullet
  }

  setNextWord() {
    if(this.currentWord.length === 0) {
      this.currentWord = this.getRandomWord()
      this.setBulletWord()
    }
  }

  shootLetter(letter) {
    if(letter === this.currentWord[0]) {
      // звук выстрела
  
      // пистолет стреляет и наклоняется
      gun.randomShout()
      enemy.shootEnemy()
      // удаляем элемент
      this.removeFirstLetter()
      enemy.decreaseLife()
    } else {
      enemy.increaseLife()
      console.log('miss!')
      // звук осечки
    }
  }

  removeFirstLetter() {
    bulletContainer.removeChild(bulletContainer.firstElementChild)
    this.currentWord = this.currentWord.slice(1)
  }

  addWord(word) {
    if(word.length <= this.wordLength) {
      this.words.push(word)
    } else {
      console.log('The word is too long')
    }
    
  }
}

export default Word