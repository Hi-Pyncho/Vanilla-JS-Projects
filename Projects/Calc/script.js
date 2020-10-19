const operators = document.querySelectorAll('.operator')
for(let operator of operators) {
  operator.addEventListener('click', function() {
    if(this.id === 'clear') {
      clearOutput()
    }
    else if(this.id === 'backspace') {
      backspace()
    }
    else {
      let output = getOutput();
      let history = getHistory();
      
			if(output === '' && history !== ''){
				if(isNaN(history[history.length - 1])){
          history = history.substring(0, history.length - 1);
				}
			}
			if(output !== '' || history !== ''){
				output = output === '' ? output : reverseNumberFormat(output);
        history = history + output;
        
				if(this.id == '='){
					calculate(history)
				}
				else {
          updateHistory(history, this.id)
				}
			}
    }
  })
}


const numbers = document.querySelectorAll('.number')
for(let number of numbers) {
  number.addEventListener('click', function() {
    updateOutput(this.id)
  })
}

function getHistory() {
  return document.querySelector('.history-value').textContent
}

function printHistory(num) {
  document.querySelector('.history-value').textContent = num
}

function updateHistory(history, id) {
  const newHistory = history + id;
  printHistory(newHistory);
  printOutput('');
}

function getOutput() {
  return document.querySelector('.output-value').textContent
}

function printOutput(num) {
  if(num === '') {
    document.querySelector('.output-value').textContent = num
  } else {
    let output = document.querySelector('.output-value') 
    output.textContent = getFormattedNumber(num)

    if(output.textContent.length > 10) {
      output.textContent = 'too much!'
    }

    return output
  } 
  
}

function updateOutput(id) {
  let output = reverseNumberFormat(getOutput())

  if(!Number.isNaN(output)) {
    output += id
    printOutput(output)
  }
}

function getFormattedNumber(num) {
  if(num === '-') {
    return ''
  }
  const number = Number(num)
  return number.toLocaleString('en')
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''))
}

function backspace() {
  let output = reverseNumberFormat(getOutput()).toString()
    if(output) {
      output = output.substring(0, output.length - 1)
      printOutput(output)
    }
}

function clearOutput() {
  printHistory('')
  printOutput('')
}

function calculate(history) {
  let result = eval(history);
  printOutput(result);
  printHistory('');
}



