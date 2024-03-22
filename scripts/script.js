/**
 * This script file contains the logic for a calculator application.
 * It handles button clicks, performs calculations, and updates the display.
 * The calculator supports basic arithmetic operations (+, -, *, /) and decimal numbers.
 * It also includes keyboard support for entering numbers and performing calculations.
 *
 * @file This file contains the logic for the calculator application.
 * @summary Calculator application script file.
 * @version 1.0.0
 */
// Select all buttons from the DOM
const allButtons = document.querySelectorAll("button");


// Add click event listeners to all buttons 
allButtons.forEach(button => {
    if(button.id === "clear-all"){
        button.addEventListener("click", clearAll)
    } else if (button.id === "clear-entry") {
        button.addEventListener("click", clearEntry)
    } else {
        button.addEventListener("click", displayNumber)
    }
});

// Select display elements from the DOM
const lowerDisplay = document.querySelector(".lower-display")
const upperDisplay = document.querySelector(".upper-display")

// Initialize variables to store the state of the calculator
let firstNum = "";
let operationSign = "";
let tempStoreCalculation = "";
let result = 0;
const operationIdent = ["+", "-", "*", "/"];
let iteration = 1;
let operatorClicked = false;
let resultDisplayed = false;
let canDeleteNumber = true;


// Function to manage the logic of the calculator
// Checks if the clicked button is an operator and performs the necessary operations
function manageCalculatorLogic(e){
    // Check if the clicked button is an operator
    if (operationIdent.includes(e.target.value)) {
        canDeleteNumber = false;
        // If this is the first time an operator is clicked
        if (iteration === 1) {

            //save operator
            operationSign = e.target.value;

            // Save the first part of the calculation into tempStoreCalculation variable
         tempStoreCalculation = calculateOperation(firstNum, operationSign)


            // Increment the iteration count
            iteration += 1;
        } else {
            // If this is not the first time an operator is clicked
            operationSign = e.target.value;
            result = tempStoreCalculation(firstNum);
            upperDisplay.textContent = `${result} ${operationSign}`;
            lowerDisplay.textContent = "";
            tempStoreCalculation = calculateOperation(result, operationSign);
        }


    }
    canDeleteNumber = true;
}

// Function to handle the equals button click
function enterBtnEndCalculation(e){
    // If the equals button is clicked, end the calculation
    if (e.target.value === "=") {
        lowerDisplay.textContent = "";
        result = tempStoreCalculation(firstNum);
        lowerDisplay.textContent = result;
        iteration = 1;
        resultDisplayed = true;
        canDeleteNumber = false;
    }
}

// Function to clear the display after the equals button is clicked
function clearAfterEnter(e) {
    if (!isNaN(e.target.textContent) && resultDisplayed) {
        lowerDisplay.textContent = "";
        upperDisplay.textContent = "";
        resultDisplayed = false;
        canDeleteNumber = true;
    }
}



// Function to handle multiple numeric inputs
function multiNumericHandler(e) {
    if (!isNaN(e.target.textContent)) {
        if (operatorClicked) {
            // If the previous button clicked was an operator, clear firstNum
            firstNum = e.target.textContent;
            operatorClicked = false;
            //again enable user to use comma
            const commaButton = document.getElementById("comma");
            commaButton.addEventListener("click", displayNumber);
        } else {
            // If the previous button clicked was not an operator, append the clicked button's text to firstNum
            firstNum = (firstNum || "") + e.target.textContent;
        }
    } else {
        // If the clicked button's text is not a number, set operatorClicked to true
        // This is here so user will not enter more then one comma per number
        if(e.target.textContent === "."){
            firstNum = (firstNum || "") + e.target.textContent;
            e.target.removeEventListener("click", displayNumber);
        } else {
            operatorClicked = true;
        }
        
    }
}



// Function to calculate the result based on the operator
function calculateOperation(a, operator) {
    return function (b) {
        let numA = parseFloat(a);
        let numB = parseFloat(b);
        switch (operator) {
            case '+':
                return numA + numB;
            case '-':
                return numA - numB;
            case '*':
                return numA * numB;
            case '/':
                return numB !== 0 ? numA / numB : 'Cannot divide by zero';
            default:
                return 'Invalid operator';
        }
    };
}

// Function to display the number when a button is clicked
function displayNumber(e) {

    clearAfterEnter(e);
    
    

    manageCalculatorLogic(e)

    enterBtnEndCalculation(e)

    // Display the clicked button's text
    lowerDisplay.textContent += e.target.textContent;
    
    multiNumericHandler(e)

}




// Function to clear the last entered number
function clearEntry() {
    if(canDeleteNumber){
        firstNum = firstNum.slice(0, -1);
        lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
    }
        

}

// Function to clear all inputs and reset the calculator
function clearAll() {
    firstNum = "";
    operationSign = "";
 tempStoreCalculation = "";
    result = 0;
    iteration = 1;
    lowerDisplay.textContent = "";
    upperDisplay.textContent = "";

}



// Adding keystroke functionality

const keyMap = {
    "1" : "#b1",
    "2" : "#b2",
    "3" : "#b3",
    "4" : "#b4",
    "5" : "#b5",
    "6" : "#b6",
    "7" : "#b7",
    "8" : "#b8",
    "9" : "#b9",
    "0" : "#b0",
    "+" : "#plus",
    "-" : "#minus",
    "*" : "multiply",
    "/" : "divide",
    "Enter" : "#enter",
    "." : "#comma",
    "Backspace" : "#clear-entry",
    "Escape" : "#clear-all"
}


// if key pressed is from keyMap,select that key and add click()function
// from there it is handled as we mouse click on button
function handleKeyPress(e){
    const key = e.key;
    const keyPressed = keyMap[key];
    if(keyPressed){
        const button = document.querySelector(keyPressed);
        if(button){
            button.click();
        }
    }
}

document.addEventListener("keydown", handleKeyPress);

