// gather various html elements

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector("#calculatorResult");
const decimal = document.querySelector('#decimal');
const clear = document.querySelector("#allClear");
const equals = document.querySelector("#equals");
const backspace = document.querySelector("#backspace");
const plusminus = document.querySelector("#plusminus");

// booleans and state properties
let boolDecimalExists = false;
let pendingBinaryOperation = null;
let firstOperand = null;
let userClickedDigit = false;

// event listeners

digits.forEach(digit => digit.addEventListener('click', clickDigit));
decimal.addEventListener('click', clickDecimal);
operators.forEach(operator => operator.addEventListener('click', clickOperator));
clear.addEventListener('click', clickAllClear);
equals.addEventListener('click', clickEquals);
backspace.addEventListener('click', clickBackspace);
plusminus.addEventListener('click', clickPlusMinus);

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

function clickPlusMinus(e) {
    userClickedDigit = true;
    display.innerText = (-1)*Number(display.innerText);
}

function clickBackspace(e) {
    //if (userClickedDigit) {
    let cur = display.innerText;
    if ((cur[0] === "-" && cur.length === 2) || (cur.length === 1)) {
        display.innerText = 0;
    } else {
        display.innerText = display.innerText.slice(0, display.innerText.length - 1);
    }
    //}
}

// keyboard support

document.addEventListener('keydown', (e) => {
    const key = e.key;
    console.log(key);
    switch (key) {
        case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0":
            document.querySelector(`#digit-${key}`).click();
            break;
        case ".":
            document.querySelector('#decimal').click();
            break;
        case "+": case "-": case "x": case "/":
            document.querySelector(`[data-opType='${key}']`).click();
            break;
        case "Enter":
            equals.click();
            break;
        case "Backspace":
            backspace.click();
            break;
        case "p":
            plusminus.click();
            break;
    }
})
