class Calculator {
  constructor(lastCalculateButton,currentCalculateButton) {
    this.lastCalculateButton = lastCalculateButton
    this.currentCalculateButton = currentCalculateButton
    this.clear();
  }
  clear(){
    this.currentOperand=''
    this.previousOperand=''
    this.operation= undefined
  }
  delete(){
    this.currentOperand=this.currentOperand.toString().slice(0,-1)

  }
  appendNumber(number){
    if(number==='.' && this.currentOperand.includes('.')) return
    this.currentOperand=this.currentOperand.toString()+number.toString()
    
  }
  chooseOperation(operation){
    if(this.currentOperand === '') return
    if(this.previousOperand !== '') {
      this.compute()
    }
    this.operation =operation
    this.previousOperand=this.currentOperand
    this.currentOperand=''
  }
  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current= parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch (this.operation){
      case '+':
        computation=prev+current
        break
      case '-':
        computation=prev-current
        break  
      case '÷':
        computation=prev/current
        break
      case '*':
        computation=prev*current
        break
    }
    this.currentOperand=computation
    this.operation=undefined
    this.previousOperand=''

  }

  getdisplayNumber(number){
   
    const stringNumber= number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits =stringNumber.split('.')[1]
    let integerDisplay

    if (isNaN(integerDigits)){
      integerDisplay=''
    } else {
      integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits: 0 })

    }

    if (decimalDigits!=null){
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay(){
    this.currentCalculateButton.innerText = this.currentOperand
    if (this.operation != null){
      this.lastCalculateButton.innerText=`${this.previousOperand}${this.operation}`
    }else {
      this.lastCalculateButton.innerText = ''
    }
  } 
}

const numberButtons =  document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[ data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector ('[data-all-clear]')
const lastCalculateButton = document.querySelector('[data-last-calculate]')
const currentCalculateButton = document.querySelector('[data-current-calculate]')


const calculator = new Calculator(lastCalculateButton,currentCalculateButton)

numberButtons.forEach(button => {
 button.addEventListener('click',() =>{
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButton.forEach(button => {
  button.addEventListener('click',() =>{
     calculator.chooseOperation(button.innerText)
     calculator.updateDisplay()
   })
 })
 
equalsButton.addEventListener('click',button =>{
  calculator.compute()
  calculator.updateDisplay()
 })

allClearButton.addEventListener('click',button =>{
  calculator.clear()
  calculator.updateDisplay()
 })

 deleteButton.addEventListener('click',button =>{
  calculator.delete()
  calculator.updateDisplay()
 })