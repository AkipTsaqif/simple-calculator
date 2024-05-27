const result = document.getElementById('result');

/*  
    add other keys such as + - / * to here (including enter key)
    this is better than using switch/if-else statements
*/
const keyHandlers = {
    'Backspace': () => {
        result.textContent = result.textContent.slice(0, -1);
    },
    'Delete': () => {
        result.textContent = '0';
    },
};

document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) {
        if (result.textContent.length < 13) {
            if (result.textContent === '0') {
                result.textContent = e.key;
            } else {
                result.textContent += e.key;
            }
        }
    } else if (e.key in keyHandlers) {
        keyHandlers[e.key]();
    }
});

const operate = (num1, num2, operation) => {
    // shall do the operations here
};