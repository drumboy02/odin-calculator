const display = document.querySelector('.display');
const clearBtn = document.querySelector('#btn-clear');
const plusMinus = document.querySelector('#btn-plus-minus');
const percentBtn = document.querySelector('#btn-percent');
const digits = document.querySelectorAll('.digit');
const decimal = document.querySelector('#btn-decimal');
const operators = document.querySelectorAll('.operator');
// temp variable for displayValue on screen
const temp = document.querySelector('.temp');

let displayValue = 0;
display.textContent = displayValue;

// digit buttons
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        // check for zero, decimal, negative and length
        if (display.textContent === '0') {
            display.textContent = '';
        }
        if (display.textContent.indexOf('.') !== -1 && display.textContent.indexOf('-') !== -1) {
            if (display.textContent.length > 10) {
                return;
            }
        } else if (display.textContent.indexOf('.') !== -1) {
            if (display.textContent.length > 9) {
                return;
            }
        } else if (display.textContent.indexOf('-') !== -1) {
            if (display.textContent.length > 9) {
                return;
            }
        } else if (display.textContent.length > 8) {
            return;
        }

        display.textContent += digit.value;
        displayValue = +display.textContent;
        // temp
        temp.textContent = typeof displayValue + ': ' + displayValue;
    })
})

// clear button
clearBtn.addEventListener('click', () => {
    display.textContent = '0';
    displayValue = +display.textContent;
    // temp
    temp.textContent = typeof displayValue + ': ' + displayValue;

})

// plus-minus button
plusMinus.addEventListener('click', () => {
    displayValue = -displayValue;
    display.textContent = displayValue;
    // temp
    temp.textContent = typeof displayValue + ': ' + displayValue;
})

// decimal button
decimal.addEventListener('click', () => {
    if (display.textContent.indexOf('.') === -1) {
        display.textContent += '.';
    }
    displayValue = +display.textContent;
    // temp
    temp.textContent = typeof displayValue + ': ' + displayValue;
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