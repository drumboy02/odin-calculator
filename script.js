const display = document.querySelector('.display');
const clearBtn = document.querySelector('#btn-clear');
const plusMinus = document.querySelector('#btn-plus-minus');
const percentBtn = document.querySelector('#btn-percent');
const digits = document.querySelectorAll('.digit');
const decimal = document.querySelector('#btn-decimal');
const operators = document.querySelectorAll('.operator');

// temp variables for displayValue on screen
const temp = document.querySelector('.temp');
const opA = document.querySelector('.operandA');
const op = document.querySelector('.op');
const opB = document.querySelector('.operandB');

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
let operator;
let operandB;

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

function calculator() {
    let displayValue = 0;
    display.textContent = displayValue;
    
    // digit buttons
    digits.forEach(digit => {
        digit.addEventListener('click', () => {
            // check for null value
            if (displayValue === null) {
                display.textContent = '';
            }
            // check for zero/error
            if (display.textContent === '0' || display.textContent === 'ERROR') {
                display.textContent = '';
            }
            // check for decimal/negative, limit the length in display
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
        operandA = 0;
        operator = null;
        operandB = 0;
    
        // temp
        temp.textContent = typeof displayValue + ': ' + displayValue;
        opA.textContent = operandA;
        op.textContent = null;
        opB.textContent = operandB;
    })
    
    // plus-minus button
    plusMinus.addEventListener('click', () => {
        displayValue = -displayValue;
        display.textContent = displayValue;
    
        // limit the length in display
        if (display.textContent.length > 10) {
            let strSlice;
            // check for decimal
            if (display.textContent.indexOf('.') !== -1) {
                strSlice = display.textContent.slice(0, 10); 
            } else {
                strSlice = display.textContent.slice(0, 10);
            }

            display.textContent = strSlice;
        }
        // temp
        temp.textContent = typeof displayValue + ': ' + displayValue;
    })
    
    // percent buttton
    percentBtn.addEventListener('click', () => {
        displayValue = displayValue / 100;
        display.textContent = displayValue;
    
        // limit the length in display        
        if (display.textContent.length > 10) {
            let strSlice;
            // check for negative
            if (display.textContent.indexOf('-') !== -1) {
                strSlice = display.textContent.slice(0, 11); 
            } else {
                strSlice = display.textContent.slice(0, 10);
            }

            display.textContent = strSlice;
        }
    
        // temp
        temp.textContent = typeof displayValue + ': ' + displayValue;
    })
    
    // decimal button
    decimal.addEventListener('click', () => {
        // check for decimal first
        if (display.textContent.indexOf('.') === -1) {
            display.textContent += '.';
        }
        displayValue = +display.textContent;
    
        // temp
        temp.textContent = typeof displayValue + ': ' + displayValue;
    })

    // operator buttons
    function operation() {
        operators.forEach(symbol => {
            symbol.addEventListener('click', () => {
                // get the operator
                operator = symbol.value;
                // temp
                op.textContent = operator;
                if (!operandA) {
                    operandA = displayValue;
                    displayValue = null;
                    // temp
                    temp.textContent = typeof displayValue + ': ' + displayValue;
                    opA.textContent = "A: " + operandA;
                }
            })
        })
    }
    operation()
}

calculator()
