const MAX_DIGITS = 13;
const RESULT = document.getElementById("result");
const OPS_DISPLAY = document.getElementById("ops-display");

let firstOperation = true, enterPressed = false;
let currentNumber = 0, resultNumber = 0;
let currentOperator = "";

const updateDisplay = (text) => OPS_DISPLAY.textContent += text;
const setDisplay = (text) => OPS_DISPLAY.textContent = text;
const resetCalculator = () => {
    setDisplay("");
    RESULT.textContent = "0";
    currentNumber = 0;
    resultNumber = 0;
    currentOperator = "";
    firstOperation = true;
};

const handleNumber = (num) => {
    if (enterPressed || resultNumber === Infinity) resetCalculator();
    if (num === "00" && currentNumber === 0) return;
    if (OPS_DISPLAY.textContent === "0") setDisplay("");
    else if (OPS_DISPLAY.textContent.match(/[\+\-\*/=]0(?![\.\+\-\*/=])/g) !== null) 
        setDisplay(OPS_DISPLAY.textContent.slice(0, -1));

    updateDisplay(num);
    currentNumber = currentNumber === '0' ? num : currentNumber + num;
};

const handleFirstOperation = (operation) => {
    resultNumber = currentNumber;
    currentOperator = operation;
    updateDisplay(operation);
    firstOperation = false;
};

const handleOperator = (operation) => {
    if (firstOperation) {
        handleFirstOperation(operation);
    } else if (currentNumber !== 0 && currentOperator !== "") {
        updateDisplay(operation);
        resultNumber = operate(resultNumber, currentNumber, currentOperator);
        RESULT.textContent = resultNumber.toString();
    } else if (currentNumber !== 0) {
        currentOperator = operation;
        updateDisplay(operation);
    } else if (currentNumber === 0)
        OPS_DISPLAY.textContent = OPS_DISPLAY.textContent.slice(0, -1) + operation;
    currentOperator = operation;
    currentNumber = 0;
    enterPressed = false;
}

const keyHandlers = {
    "+": () => handleOperator("+"),
    "-": () => handleOperator("-"),
    "*": () => handleOperator("*"),
    "/": () => handleOperator("/"),
    Enter: () => {
        if (currentNumber !== 0 && currentOperator !== "") {
            resultNumber = operate(resultNumber, currentNumber, currentOperator);
            updateDisplay(`=${resultNumber}`);
            RESULT.textContent = resultNumber.toString();
            currentOperator = "";
        }
        enterPressed = true;
    },
    Backspace: () => {
        RESULT.textContent = RESULT.textContent.length > 1
                            ? RESULT.textContent.slice(0, -1)
                            : "0";
        setDisplay(OPS_DISPLAY.textContent.slice(0, -1));
        currentNumber = currentNumber.slice(0, -1);
    },
    Delete: () => resetCalculator(),
    ".": () => {
        if (enterPressed) {
            resetCalculator();
            updateDisplay("0.");
            currentNumber = "0.";
            enterPressed = false;
        } else if (!currentNumber.includes(".")) {
            updateDisplay(".");
            currentNumber += ".";
        }
    },
    "+/-": () => {
        if (currentNumber !== 0 && resultNumber === 0) {
            currentNumber = currentNumber < 0
                            ? Math.abs(currentNumber)
                            : -Math.abs(currentNumber);
            setDisplay(currentNumber);
        } else if (resultNumber !== 0) {
            resultNumber = resultNumber < 0
                            ? Math.abs(resultNumber)
                            : -Math.abs(resultNumber);
            RESULT.textContent = resultNumber;
            setDisplay(resultNumber);
        }
    },
    "00": () => {
        handleNumber("00");
    }
};

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const key = button.id;
        if (resultNumber === Infinity) keyHandlers["Delete"]();
        if (!isNaN(key) && resultNumber !== Infinity) handleNumber(key);
        if (OPS_DISPLAY.textContent.length === 0 && isNaN(key)) return;
        else keyHandlers[key]();
    });
});

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        e.preventDefault();
        handleNumber(e.key);
    } else if (e.key in keyHandlers && resultNumber !== Infinity) {
        e.preventDefault();
        if (OPS_DISPLAY.textContent.length === 0) return;

        keyHandlers[e.key]();
        if (e.key === ".") return;
        if (e.key === "Enter") {
            enterPressed = true;
            return;
        }
        if (!e.key === "Backspace") currentNumber = 0;
    } else if (e.key in keyHandlers && resultNumber === Infinity) {
        keyHandlers["Delete"]();
    }
});

const operate = (num1, num2, operation) => {
    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    };
    let result = operations[operation](parseFloat(num1), parseFloat(num2));
    let intPartLength = Math.floor(result).toString().length;
    return intPartLength > MAX_DIGITS 
        ? result.toExponential(MAX_DIGITS - 4).replace("e+", "e") 
        : parseFloat(result.toFixed(MAX_DIGITS - intPartLength));
};