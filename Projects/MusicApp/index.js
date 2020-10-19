window.addEventListener('load', () => {
  const sounds = document.querySelectorAll('.sound')
  const pads = document.querySelectorAll('.pads div')
  const visual = document.querySelector('.visual')
  const colors = [
    '#60d394',
    '#d36060',
    '#c060d3',
    '#d3d160',
    '#e77de7',
    '#5963c2',
  ]

  function playSound(index) {
    sounds[index].currentTime = 0
    sounds[index].play()
  }

  function animatePad(pad) {
    pad.classList.add('clicked')
      setTimeout(() => {
        pad.classList.remove('clicked')
      }, 200);
  }
  
  pads.forEach((pad, index) => {

    pad.addEventListener('click', function() {
      playSound(index)
      // createBubbles(index)
      animatePad(pad)
      
    }) 

    
  })

  document.addEventListener('keydown', function(e) {
    switch (e.code) {
      case 'Digit1':
        playSound(0)
        animatePad(pads[0])
        break;
      case 'Digit2':
        playSound(1)
        animatePad(pads[1])
        break;
      case 'Digit3':
        playSound(2)
        animatePad(pads[2])
        break;
      case 'Digit4':
        playSound(3)
        animatePad(pads[3])
        break;
      case 'Digit5':
        playSound(4)
        animatePad(pads[4])
        break;
      case 'Digit6':
        playSound(5)
        animatePad(pads[5])
        break;
    }
  })
  
})


const dark = document.querySelector('.dark')

window.addEventListener('load', function() {
  if(window.matchMedia("(min-width: 1000px)").matches) {
    dark.classList.remove('hide')
  }
  dark.addEventListener('click', function() {
    dark.classList.add('hide')
  })
})

const playButton = document.querySelector('.playButton')
const music = playButton.querySelector('audio')

playButton.addEventListener('click', function() {
  music.play()
  playButton.classList.add('hide')
})





