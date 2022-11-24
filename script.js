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
let userClickedOperation = false;
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
    userClickedOperation = false;
}

// event handlers

function clickDigit(e) {
    if (userClickedOperation) {
        display.innerText = this.innerText;
        userClickedOperation = false;
    } else {
        if (display.innerText === "0") {
            display.innerText = "";    
        }
        display.innerText = `${display.innerText}${this.innerText}`;
    }
}

function clickDecimal(e) {
    if (userClickedOperation) {
        display.innerText = "0."
        userClickedOperation = false;
    } else {
        if (!boolDecimalExists) {
            display.innerText = `${display.innerText}${this.innerText}`;
        }
    }
    boolDecimalExists = true;
}

function clickOperator(e) {
    userClickedOperation = true;
    boolDecimalExists = false;
    if(pendingBinaryOperation) {
        firstOperand = evaluate();
        pendingBinaryOperation = this.innerText;
    } else {
        firstOperand = Number(display.innerText);
        pendingBinaryOperation = this.innerText;
    }
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

/////////////////////


// let boolDecimalExists = false;
// let pendingOperand = null;
// let pendingOperation = null;

// function clickDigit(e) {
//     if (display.innerText === "0") {
//         display.innerText = "";    
//     }
//     display.innerText = `${display.innerText}${this.innerText}`;
// }

// function clickDecimal(e) {
//     if (!boolDecimalExists) {
//         display.innerText = `${display.innerText}${this.innerText}`;
//     }
//     boolDecimalExists = true;
// }

// function clickAllClear(e) {
//     boolDecimalExists = false;
//     display.innerText = "0";
// }

// function evaluateOperation(operator, a, b) {
//     let result;
//     switch (operator) {
//         case '÷':
//             result = a / b;
//             break;
//         case 'x':
//             result = a * b;
//             break;
//         case '-':
//             result = a - b;
//             break;
//         case '+':
//             result = a + b;
//             break;
//     }
//     return result;
// }

// function clickOperator(e) {
//     if (pendingOperation !== null) {

//     } else {
//         pendingOperation = this.innerText;
//         pendingOperand = display.innerText;
//     }
// }

// digits.forEach(digit => digit.addEventListener('click', clickDigit));
// decimal.addEventListener('click', clickDecimal);
// allClear.addEventListener('click', clickAllClear);
// operators.forEach(operator => operator.addEventListener('click', clickOperator));

