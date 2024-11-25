const display = document.querySelector('.display');
const clearBtn = document.querySelector('#btn-clear');
const plusMinus = document.querySelector('#btn-plus-minus')
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');

let displayValue = 0;
display.textContent = displayValue;

// clear button
clearBtn.addEventListener('click', () => {
    display.textContent = 0;
    displayValue = +display.textContent;
    console.log(displayValue);
})

// plus-minus button
plusMinus.addEventListener('click', () => {
    displayValue = -displayValue;
    display.textContent = displayValue;
    console.log(displayValue);
})

// digit buttons
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        // check the value 
        if (displayValue === 0) {
            display.textContent = '';
        } else if (display.textContent === 'ERROR') {
            return;
        }
        display.textContent += digit.value;
        // limit the value length
        if (display.textContent.length > 10) {
            display.textContent = 'ERROR';
        }
        // store the value
        displayValue = +display.textContent;
        console.log(displayValue);
    })
})

// add function
function add(a, b) {
    return a + b;
}
// subtract function
function subtract(a, b) {
    return a - b;
}
// multiply function
function multiply(a, b) {
    return a * b;
}
// divide function
function divide(a, b) {
    return a / b;
}

// create 3 variables for each part of operation
let operandA;
let operandB;
let operator;

// create operate function
function operate(op, a, b) {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "ERROR";
    }
}