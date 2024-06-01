const MAX_DIGITS = 13;

const RESULT = document.getElementById("result");
const OPS_DISPLAY = document.getElementById("ops-display");

let firstOperation = true;
let enterPressed = false;
let currentNumber = 0;
let resultNumber = 0;
let currentOperator = "";

const numberPressed = (num) => {
    if (num === "00" && currentNumber === 0) return;
    if (OPS_DISPLAY.textContent === "0") OPS_DISPLAY.textContent = "";
    else if (OPS_DISPLAY.textContent.match(/[\+\-\*/=]0(?!\.)/g) !== null)
        OPS_DISPLAY.textContent = OPS_DISPLAY.textContent.slice(0, -1);

    OPS_DISPLAY.textContent += num;

    if (currentNumber === 0) currentNumber = num;
    else currentNumber += num;
};

const firstOperationTrue = (operation) => {
    resultNumber = currentNumber;
    currentOperator = operation;
    OPS_DISPLAY.textContent += operation;
    firstOperation = false;
};

const keyHandlers = {
    "+": () => {
        if (firstOperation) {
            firstOperationTrue("+");
        } else if (currentNumber !== 0 && currentOperator !== "") {
            OPS_DISPLAY.textContent += "+";
            resultNumber = operate(
                resultNumber,
                currentNumber,
                currentOperator
            );
            RESULT.textContent = resultNumber.toString();
        } else if (currentNumber !== 0) {
            currentOperator = "+";
            OPS_DISPLAY.textContent += "+";
        } else if (currentNumber === 0)
            OPS_DISPLAY.textContent =
                OPS_DISPLAY.textContent.slice(0, -1) + "+";
        currentOperator = "+";
        currentNumber = 0;
    },
    "-": () => {
        if (firstOperation) {
            firstOperationTrue("-");
        } else if (currentNumber !== 0 && currentOperator !== "") {
            OPS_DISPLAY.textContent += "-";
            resultNumber = operate(
                resultNumber,
                currentNumber,
                currentOperator
            );
            RESULT.textContent = resultNumber.toString();
        } else if (currentNumber !== 0) {
            currentOperator = "-";
            OPS_DISPLAY.textContent += "-";
        } else if (currentNumber === 0)
            OPS_DISPLAY.textContent =
                OPS_DISPLAY.textContent.slice(0, -1) + "-";
        currentOperator = "-";
        currentNumber = 0;
    },
    "*": () => {
        if (firstOperation) {
            firstOperationTrue("*");
        } else if (currentNumber !== 0 && currentOperator !== "") {
            OPS_DISPLAY.textContent += "*";
            resultNumber = operate(
                resultNumber,
                currentNumber,
                currentOperator
            );
            RESULT.textContent = resultNumber.toString();
        } else if (currentNumber !== 0) {
            currentOperator = "*";
            OPS_DISPLAY.textContent += "*";
        } else if (currentNumber === 0)
            OPS_DISPLAY.textContent =
                OPS_DISPLAY.textContent.slice(0, -1) + "*";
        currentOperator = "*";
        currentNumber = 0;
    },
    "/": () => {
        if (firstOperation) {
            firstOperationTrue("/");
        } else if (currentNumber !== 0 && currentOperator !== "") {
            OPS_DISPLAY.textContent += "/";
            resultNumber = operate(
                resultNumber,
                currentNumber,
                currentOperator
            );
            RESULT.textContent = resultNumber.toString();
        } else if (currentNumber !== 0) {
            currentOperator = "/";
            OPS_DISPLAY.textContent += "/";
        } else if (currentNumber === 0)
            OPS_DISPLAY.textContent =
                OPS_DISPLAY.textContent.slice(0, -1) + "/";
        currentOperator = "/";
        currentNumber = 0;
    },
    Enter: () => {
        if (currentNumber !== 0 && currentOperator !== "") {
            resultNumber = operate(
                resultNumber,
                currentNumber,
                currentOperator
            );
            OPS_DISPLAY.textContent += `=${resultNumber}`;
            RESULT.textContent = resultNumber.toString();
            currentOperator = "";
        }
    },
    Backspace: () => {
        RESULT.textContent =
            RESULT.textContent.length > 1
                ? RESULT.textContent.slice(0, -1)
                : "0";
        OPS_DISPLAY.textContent = OPS_DISPLAY.textContent.slice(0, -1);
        currentNumber = currentNumber.slice(0, -1);
    },
    Delete: () => {
        RESULT.textContent = "0";
        OPS_DISPLAY.textContent = "";
        currentNumber = 0;
        resultNumber = 0;
    },
    ".": () => {
        if (!currentNumber.includes(".")) {
            OPS_DISPLAY.textContent += ".";
            currentNumber += ".";
        }
    },
    "+/-": () => {
        if (currentNumber !== 0) {
            currentNumber =
                currentNumber < 0
                    ? Math.abs(currentNumber)
                    : -Math.abs(currentNumber);
            OPS_DISPLAY.textContent = currentNumber;
        }
    },
    0: () => {
        numberPressed("0");
    },
    "00": () => {
        numberPressed("00");
    },
    1: () => {
        numberPressed("1");
    },
    2: () => {
        numberPressed("2");
    },
    3: () => {
        numberPressed("3");
    },
    4: () => {
        numberPressed("4");
    },
    5: () => {
        numberPressed("5");
    },
    6: () => {
        numberPressed("6");
    },
    7: () => {
        numberPressed("7");
    },
    8: () => {
        numberPressed("8");
    },
    9: () => {
        numberPressed("9");
    },
};

const btnHandlers = {
    add: keyHandlers["+"],
    substract: keyHandlers["-"],
    multiply: keyHandlers["*"],
    divide: keyHandlers["/"],
    equal: keyHandlers["Enter"],
    comma: keyHandlers["."],
    clear: keyHandlers["Delete"],
    sign: keyHandlers["+/-"],
    0: keyHandlers["0"],
    "00": keyHandlers["00"],
    1: keyHandlers["1"],
    2: keyHandlers["2"],
    3: keyHandlers["3"],
    4: keyHandlers["4"],
    5: keyHandlers["5"],
    6: keyHandlers["6"],
    7: keyHandlers["7"],
    8: keyHandlers["8"],
    9: keyHandlers["9"],
};

for (let key in btnHandlers) {
    let button = document.getElementById(key);
    if (button) {
        button.addEventListener("click", btnHandlers[key]);
    }
}

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        e.preventDefault();
        numberPressed(e.key);
    } else if (e.key in keyHandlers) {
        e.preventDefault();

        if (OPS_DISPLAY.textContent.length === 0) return;

        keyHandlers[e.key]();

        if (e.key === ".") return;
        if (e.key === "Enter") {
            enterPressed = true;
            return;
        }
        if (!e.key === "Backspace") currentNumber = 0;
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
    let resultLength = result.toString().replace(".").length;

    if (resultLength > MAX_DIGITS) {
        let integerPartLength = result.toString().split(".")[0].length;
        let decimalPlaces = Math.max(0, 13 - integerPartLength);
        result = parseFloat(result.toFixed(decimalPlaces));
    }

    return result;
};
