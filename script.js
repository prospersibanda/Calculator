// selecting the display and buttons from the DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables to keep track of the current input and operation
let currentInput = '0';
let previousInput = '';
let operation = '';

// function to update the display
function updateDisplay(value) {
    display.textContent = value;
} 

//Display Update
updateDisplay(currentInput);

// function to handle number button clicks
function handleNumber(num) {
    // if the current input is '0', replace it with the clicked number
    if (currentInput === '0') {
        currentInput = num;
    }else{
        currentInput += num;
    }
    updateDisplay(currentInput);
}

// event listeners to all number buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        //checks if the button clicked is a number
        if (button.hasAttribute('data-num')) {
            handleNumber(button.getAttribute('data-num'));
        }
    });
});

//function to handle operator button clicks
function handleOperator(op) {
    operation = op;
    previousInput = currentInput;
    currentInput = '0';
    updateDisplay(currentInput);
   
    
    
}

//function to perform the calculation
function calculate() {
    if (!operation || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;    
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
}

// event listeners to all operator buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        //check if the button clicked is an operator
        if (button.hasAttribute('data-op')) {
            handleOperator(button.getAttribute('data-op'));
        }
    });
});

function handleEquals(){
    calculate();
    updateDisplay(currentInput);
}

// event listener to the equals buttons
document.getElementById('equals').addEventListener('click', handleEquals);

// Function to handle clear button click
function handleClear() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay(currentInput);
}

// Add event listener to the clear button
document.getElementById('clear').addEventListener('click', handleClear);

