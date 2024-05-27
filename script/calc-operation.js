const result = document.getElementById('result');
const ops_display = document.getElementById('ops-display');

let firstOperation = true;
let enterPressed = false;
let currentNumber = 0;
let resultNumber = 0;
let currentOperator = '';

/*  
    add other keys such as + - / * to here (including enter key)
    this is better than using switch/if-else statements

    also i haven't made a check if the user press an operator before a number to display an error or does nothing, so this will definitely buggy for now
*/
const keyHandlers = {
    '+': () => {                                                                    // some bugs could arise from this implementation but at least for now it works
        if (firstOperation) {                                                       // first it checks whether this is the first time a + is pressed
            resultNumber = currentNumber;                                           // if yes it does nothing to the result display, only after another number and
            currentNumber = 0;                                                      // another + is pressed it will display the result
            currentOperator = '+';
            ops_display.textContent += '+';
            firstOperation = false;
        } else if (currentNumber !== 0 && currentOperator !== '') {
            ops_display.textContent += '+';
            resultNumber = operate(resultNumber, currentNumber, currentOperator);
            result.textContent = resultNumber.toString();
        }
    },
    '-': () => {
        ops_display.textContent += String.fromCharCode(45);
    },
    '*': () => {
        ops_display.textContent += String.fromCharCode(42);
    },
    '/': () => {
        ops_display.textContent += String.fromCharCode(247);
    },
    'Enter': () => {                                                                // now for pressing enter (equal btn), i've set it so that if another number is
        if (currentNumber !== 0 && currentOperator !== '') {                        // pressed it will reset everything (just like a normal calculator i've been using)
            resultNumber = operate(resultNumber, currentNumber, currentOperator);
            ops_display.textContent += '=';
            result.textContent = resultNumber.toString();
            currentNumber = 0;
            currentOperator = '';
            firstOperation = true;
            enterPressed = true;
        }
    },
    'Backspace': () => {
        result.textContent = result.textContent.length > 1 ? result.textContent.slice(0, -1) : '0';
        ops_display.textContent = ops_display.textContent.slice(0, -1);
    },
    'Delete': () => {
        result.textContent = '0';
        ops_display.textContent = '';
        currentNumber = 0;
        resultNumber = 0;
    },
};

document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) {
        if (enterPressed) {
            ops_display.textContent = '';
            resultNumber = 0;
            result.textContent = '0';
            enterPressed = false;
        }
        ops_display.textContent += e.key;
        currentNumber += e.key;
    } else if (e.key in keyHandlers) {
        e.preventDefault();
        keyHandlers[e.key]();
        currentNumber = 0;
    }
});

const operate = (num1, num2, operation) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    return operations[operation](parseInt(num1), parseInt(num2));
};