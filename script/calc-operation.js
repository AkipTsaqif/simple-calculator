const MAX_DIGITS = 13;

const RESULT = document.getElementById('result');
const OPS_DISPLAY = document.getElementById('ops-display');

let firstOperation = true;
let enterPressed = false;
let currentNumber = 0;
let resultNumber = 0;
let currentOperator = '';

// this function is called when a number is pressed
const numberPressed = (num) => {
    if (enterPressed) {
            OPS_DISPLAY.textContent = '';
            resultNumber = 0;
            RESULT.textContent = '0';
            enterPressed = false;
        }

    if (num === '00' && currentNumber === 0) return;                  // if the current number is 0 and 00 is pressed, it will do nothing (to prevent 0000 from happening)
    if (OPS_DISPLAY.textContent === '0') OPS_DISPLAY.textContent = '';  // if the display is 0, it will remove the 0
    OPS_DISPLAY.textContent += num;
    
    if (currentNumber === 0) currentNumber = num;                     // if the current number is 0, it will replace the 0 with the key pressed
    else currentNumber += num;                                        // to prevent something like 01 from happening
}

/*  
    add other keys such as + - / * to here (including enter key)
    this is better than using switch/if-else statements
*/

// modify variables if first operaiont is true function
const firstOperationTrue = (operation) =>{
    resultNumber = currentNumber;                                           // if yes it does nothing to the result display, only after another number and
    currentNumber = 0;                                                      // another + is pressed it will display the result
    currentOperator = operation;
    OPS_DISPLAY.textContent += operation;
    firstOperation = false;
}
const keyHandlers = {
    '+': () => {                                                                    // some bugs could arise from this implementation but at least for now it works
        if (firstOperation) {                                                       // first it checks whether this is the first time a + is pressed
            firstOperationTrue('+')                                                    // if yes it does nothing to the result display, only after another number and
                                                                                    // another + is pressed it will display the result
        } else if (currentNumber !== 0 && currentOperator !== '') {
            OPS_DISPLAY.textContent = '+'
            resultNumber = operate(resultNumber, currentNumber, currentOperator);
            RESULT.textContent = resultNumber.toString();
        }
    },
    '-': () => {
        if (firstOperation) {                                                       // first it checks whether this is the first time a + is pressed
            firstOperationTrue("-")                                                     // if yes it does nothing to the result display, only after another number and
                                                                                    // another + is pressed it will display the result
        } else if (currentNumber !== 0 && currentOperator !== '') {
            OPS_DISPLAY.textContent = '-'
            resultNumber = operate(resultNumber, currentNumber, currentOperator);
            RESULT.textContent = resultNumber.toString();
        }
    },
    '*': () => {
        OPS_DISPLAY.textContent += String.fromCharCode(42);
    },
    '/': () => {
        OPS_DISPLAY.textContent += String.fromCharCode(247);
    },
    ".": () => {
        if (!currentNumber.includes('.')) {
            OPS_DISPLAY.textContent += '.';
            currentNumber += '.';
        }
    },
    "+/-": () => {
        if (currentNumber !== 0) {
            currentNumber = currentNumber < 0 ? Math.abs(currentNumber)  : -Math.abs(currentNumber);
            OPS_DISPLAY.textContent = currentNumber;
        }
    },
    '0': () => {
        numberPressed('0');
    },
    '00': () => {
        numberPressed('00');
    },
    '1': () => {
        numberPressed('1');
    },
    '2': () => {
        numberPressed('2');
    },
    'Enter': () => {                                                                // now for pressing enter (equal btn), i've set it so that if another number is
        if (currentNumber !== 0 && currentOperator !== '') {                        // pressed it will reset everything (just like a normal calculator i've been using)
            resultNumber = operate(resultNumber, currentNumber, currentOperator);
            OPS_DISPLAY.textContent += '=';
            RESULT.textContent = resultNumber.toString();
            currentNumber = 0;
            currentOperator = '';
            firstOperation = true;
            enterPressed = true;
        }
    },
    'Backspace': () => {
        RESULT.textContent = RESULT.textContent.length > 1 ? RESULT.textContent.slice(0, -1) : '0';
        OPS_DISPLAY.textContent = OPS_DISPLAY.textContent.slice(0, -1);
    },
    'Delete': () => {
        RESULT.textContent = '0';
        OPS_DISPLAY.textContent = '';
        currentNumber = 0;
        resultNumber = 0;
    },
};

const btnHandlers = {
    'add': keyHandlers['+'],
    'substract': keyHandlers['-'],
    'multiply': keyHandlers['*'],
    'divide': keyHandlers['/'],
    'equal': keyHandlers['Enter'],
    'comma': keyHandlers['.'],
    'clear': keyHandlers['Delete'],
    'sign': keyHandlers['+/-'],
    '0': keyHandlers['0'],
    '00': keyHandlers['00'],
    '1': keyHandlers['1'],
    '2': keyHandlers['2'],
    // and so on
};

for (let key in btnHandlers) {
    let button = document.getElementById(key);
    if (button) {
        button.addEventListener('click', btnHandlers[key]);
    }
}

document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) {                                // if the key pressed is a number
        numberPressed(e.key);
    } else if (e.key in keyHandlers) {                  // if the key pressed isnt a number
        e.preventDefault();

        if (OPS_DISPLAY.textContent.length === 0) return;

        keyHandlers[e.key]();

        if (e.key === '.') return;
        currentNumber = 0;
    }
});



const operate = (num1, num2, operation) => {
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    let result = operations[operation](parseFloat(num1), parseFloat(num2));
    let resultLength = result.toString().replace('.').length;

    if (resultLength > MAX_DIGITS) {
        let integerPartLength = result.toString().split('.')[0].length;
        let decimalPlaces = Math.max(0, 13 - integerPartLength);
        result = parseFloat(result.toFixed(decimalPlaces));
    }

    return result;
};