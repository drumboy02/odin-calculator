const display = document.querySelector('.display');
const clearBtn = document.querySelector('#btn-clear');
const plusMinus = document.querySelector('#btn-plus-minus');
const percentBtn = document.querySelector('#btn-percent');
const digits = document.querySelectorAll('.digit');
const decimal = document.querySelector('#btn-decimal');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('#btn-equal');

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
        })
    })
    
    // clear button
    clearBtn.addEventListener('click', () => {
        display.textContent = '0';
        displayValue = +display.textContent;
        operandA = 0;
        operator = null;
        operandB = 0;
    })
    
    // plus-minus button
    plusMinus.addEventListener('click', () => {
        if (!displayValue && operandA) {
            displayValue = operandA;
            displayValue = -displayValue;
            display.textContent = displayValue;
        } else {
            displayValue = -displayValue;
            display.textContent = displayValue;
        }

        // limit the length in display
        if (display.textContent.length > 10) {
            let strSlice;
            // check for decimal
            if (display.textContent.indexOf('.') !== -1) {
                strSlice = display.textContent.slice(0, 11); 
            } else {
                strSlice = display.textContent.slice(0, 10);
            }

            display.textContent = strSlice;
        }
    })
    
    // percent buttton
    percentBtn.addEventListener('click', () => {
        if (!displayValue && operandA) {
            operandA = operandA / 100;
            displayValue = operandA;
            display.textContent = displayValue;
        } else {
            displayValue = displayValue / 100;
            display.textContent = displayValue;
        }

    
        // limit the length in display        
        if (display.textContent.length > 10) {
            let strSlice;
            // check for negative
            if (display.textContent.indexOf('-') !== -1) {
                if (display.textContent.indexOf('e') !== -1) {
                    strSlice = display.textContent.slice(0, 10);
                } else {
                    strSlice = display.textContent.slice(0, 11); 
                }
            } else {
                strSlice = display.textContent.slice(0, 10);
            }

            display.textContent = strSlice;
        }
    })
    
    // decimal button
    decimal.addEventListener('click', () => {
        // check for decimal first
        if (display.textContent.indexOf('.') === -1) {
            display.textContent += '.';
        }
        displayValue = +display.textContent;
    })

    // operator buttons
    operators.forEach(symbol => {
        symbol.addEventListener('click', () => {
            // get the operator
            
            // if null or no value stored
            if (!operator || !displayValue) {
                operator = symbol.value;
            } else if (operator && operandA && displayValue) {
                // if there's a value already
                result = operate(operator, operandA, displayValue);
                display.textContent = result;

                operandA = result;
                displayValue = null;

                // then get operator
                operator = symbol.value;
            }

            // if bank A is empty
            if (!operandA && displayValue !== null) {
                operandA = displayValue;
            } else {
            // if bank B is empty
                operandB = displayValue;
            }

            // solve
            if (operandA && operandB) {
                result = operate(operator, operandA, operandB);

                display.textContent = result;
                operandA = result;
            }
            // dislayValue, not textContent
            displayValue = null;
            operandB = 0;
        })
    })

    // equal button
    equal.addEventListener('click', () => {
        if (operator && operandA && displayValue && !operandB) {
            result = operate(operator, operandA, displayValue);

            display.textContent = result;

            operandA = 0;
            displayValue = null;
            operator = null;
        }
    })
}

calculator();
