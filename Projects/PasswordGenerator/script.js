const button = document.querySelector('.button')
const input = document.querySelector('.password')
const copyButton = document.querySelector('.icon')
const copyMessage = document.querySelector('.copyMessage')

button.addEventListener('click', (evt) => {
  evt.preventDefault()

  button.classList.add('pressed')
  let timeId = setTimeout(() => {
    button.classList.remove('pressed')
    clearTimeout(timeId)
  }, 400)

  input.value = getPassword()
})

function getPassword() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&*<=>?@][^_}{~'
  const passwordLength = 16
  let password = ''

  for(let i = 0; i < passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }

  return password
}


copyButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(input.value)
  copyMessage.classList.add('copied')
  let timeId = setTimeout(() => {
    copyMessage.classList.remove('copied')
    clearTimeout(timeId)
  }, 1000);
})