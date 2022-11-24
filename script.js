// gather various html elements

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector("#calculatorResult");
const decimal = document.querySelector('#decimal');
const clear = document.querySelector("#allClear");
const equals = document.querySelector("#equals");

// booleans and state properties
let boolDecimalExists = false;
let pendingBinaryOperation = null;
let firstOperand = null;
//let userClickedOperation = false;
let userClickedDigit = false;

// event listeners

digits.forEach(digit => digit.addEventListener('click', clickDigit));
decimal.addEventListener('click', clickDecimal);
operators.forEach(operator => operator.addEventListener('click', clickOperator));
clear.addEventListener('click', clickAllClear);
equals.addEventListener('click', clickEquals)

// helper functions

function evaluateOperation(operator, a, b) {
    let result;
    switch (operator) {
        case '÷':
            result = a / b;
            break;
        case 'x':
            result = a * b;
            break;
        case '-':
            result = a - b;
            break;
        case '+':
            result = a + b;
            break;
    }
    return result;
}

function evaluate() {
    display.innerText = evaluateOperation(pendingBinaryOperation, firstOperand, Number(display.innerText));
    return Number(display.innerText);
}

function resetState() {
    boolDecimalExists = false;
    pendingBinaryOperation = false;
    firstOperand = null;
    userClickedDigit = false;
}

// event handlers

function clickDigit(e) {
    if (!userClickedDigit) {
        display.innerText = this.innerText;
    } else {
        if (display.innerText === "0") {
            display.innerText = "";    
        }
        display.innerText = `${display.innerText}${this.innerText}`;
    }
    userClickedDigit = true;
}

function clickDecimal(e) {
    if (!userClickedDigit) {
        display.innerText = "0."
    } else {
        if (!boolDecimalExists) {
            display.innerText = `${display.innerText}${this.innerText}`;
        }
    }
    boolDecimalExists = true;
    userClickedDigit = true;
}

function clickOperator(e) {
    if (!userClickedDigit) {
        console.log("hoisies");
        firstOperand = Number(display.innerText);
        pendingBinaryOperation = this.innerText;
        userClickedDigit = false;
        boolDecimalExists = false;
        return;
    }
    if(pendingBinaryOperation) {
        firstOperand = evaluate();
        pendingBinaryOperation = this.innerText;
    } else {
        firstOperand = Number(display.innerText);
        pendingBinaryOperation = this.innerText;
    }
    userClickedDigit = false;
    boolDecimalExists = false;
}   

function clickAllClear(e) {
    resetState();
    display.innerText = "0";
}

function clickEquals(e) {
    if (pendingBinaryOperation) {
        evaluate()
        resetState();
    }
}

