import {Modal} from './modal.js'
import {AlertError} from './alert-error.js'
import{calculateIMC, notANumber} from './utils.js'

// VARIAVEIS
const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')

//FUNÇÕES
inputWeight.oninput = () => AlertError.close()
inputHeight.oninput = () => AlertError.close()
form.onsubmit = event => {
  event.preventDefault()
  
  const weight = inputWeight.value
  const height = inputHeight.value

  const weightOrHeightIsNotANumber = notANumber (weight) || notANumber (height)
  if (weightOrHeightIsNotANumber) {
    AlertError.open()
    return;
  }
  AlertError.close()

  const result = calculateIMC(weight, height)
  displayResultMessage(result)
}
function getIMCCategory(imc) {
  switch (true) {
    case (imc < 18.5):
      return 'Magreza';
    case (imc >= 18.5 && imc < 24.9):
      return 'Normal';
    case (imc >= 25 && imc < 29.9):
      return 'Sobrepeso';
    case (imc >= 30 && imc < 39.9):
      return 'Obesidade';
    default:
      return 'Obesidade grave';
  }
}
function displayResultMessage(result) {
  const category = getIMCCategory(result)
  const message = `Seu IMC é de ${result}. Classificação: ${category}`

  Modal.message.innerText = message
  Modal.open()
}
