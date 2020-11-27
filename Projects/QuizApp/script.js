import {quiz} from './quiz.js'

const answersList = document.querySelector('.btn-list')
const question = document.querySelector('.question')
const nextButton = document.querySelector('.next-btn')
const alertSound = document.querySelector('.alert')
const successSound = document.querySelector('.success')
const progressBar = document.querySelector('.quiz-progress')
const endGameSuccess = document.querySelector('.endGame-success-message')
const endGameFail = document.querySelector('.endGame-fail')
const retryButton = document.querySelector('.btn-retry')

let currentIndex = 0;


(function setup() {
  showStartProgress()
  showQuestion(currentIndex)

  nextButton.addEventListener('click', () => {
    if(currentIndex === quiz.length - 1) {
      isPassed()
        ? endGameSuccess.classList.remove('hide')
        : endGameFail.classList.remove('hide')
    } else {
      clear(answersList)
      setNextQuestion()
      showQuestion(currentIndex)
      disableButton(nextButton)
    }
  })
  
  answersList.addEventListener('click', (e) => {
    e.preventDefault()
  
    if(e.target.textContent === quiz[currentIndex].rightAnswer) {
      successSound.play()
      showCurrentProgress(currentIndex, '1')
    } else {
      e.target.classList.add('wrongAnswer')
      alertSound.play()
      showCurrentProgress(currentIndex, '0')
    }
  
    highlightCorrectAnswer(answersList, e.target)
    enableButton(nextButton)
  })
  
  retryButton.addEventListener('click', () => {
    endGameFail.classList.add('hide')
    resetQuiz()
  })
})()


function createAnswersList(cls, answers) {
  const button = document.createElement('button')
  button.classList.add(cls)

  answers.forEach((answer) => {
    button.textContent = answer
    answersList.append(button.cloneNode(true))
  })
}

function disableButton(button) {
  if(!button.classList.contains('disabled')) {
    button.classList.add('disabled')
    button.classList.remove('enabled')
  }
}

function enableButton(button) {
  if(!button.classList.contains('enabled')) {
    button.classList.add('enabled')
    button.classList.remove('disabled')
  }
}

function createProgressItem(result) {
  const progressItem = document.createElement('div')
  progressItem.classList.add('progress-item')
  progressItem.textContent = result

  progressBar.append(progressItem.cloneNode(true))
}

function showStartProgress() {
  for(let i = 0; i < quiz.length; i++) {
    createProgressItem('-')
  }
}

function showCurrentProgress(index, result) {
  const progressItems = progressBar.children

  progressItems[index].textContent = result
  progressItems[index].classList.add('completed')
}

function isPassed() {
  const progressItems = Array.from(progressBar.children)

  const result = progressItems.filter(item => item.textContent === '1').length

  const passingScore = Math.ceil(quiz.length / 100 * 80)

  return result >= passingScore ? true : false
}

function setQuestionText(text) {
  question.textContent = text
}

function setNextQuestion() {
  currentIndex++
}

function highlightCorrectAnswer(answers, target) {
  Array.from(answers.children).forEach(answer => {
    if(answer.textContent === quiz[currentIndex].rightAnswer) {
      answer.classList.add('correctAnswer')
    }
    answer.style.pointerEvents = 'none'
  })
}

function clear(container) {
  while(container.firstChild) {
    container.removeChild(container.lastChild)
  }
}

function resetQuiz() {
  clear(progressBar)
  clear(answersList)
  showStartProgress()
  currentIndex = 0
  showQuestion(currentIndex)
}

function showQuestion(index) {
  createAnswersList('btn', quiz[index].answers)
  setQuestionText(quiz[index].question)
}







