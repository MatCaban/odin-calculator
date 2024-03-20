//selectors for all buttons
const zeroBtn = document.querySelector("#b0");
const oneBtn = document.querySelector("#b1");
const twoBtn = document.querySelector("#b2");
const threeBtn = document.querySelector("#b3");
const fourBtn = document.querySelector("#b4");
const fiveBtn = document.querySelector("#b5");
const sixBtn = document.querySelector("#b6");
const sevenBtn = document.querySelector("#b7");
const eightBtn = document.querySelector("#b8");
const nineBtn = document.querySelector("#b9");
const commaBtn = document.querySelector("#comma");
const plusBtn = document.querySelector("#plus");
const divideBtn = document.querySelector("#divide");
const multiplyBtn = document.querySelector("#multiply");
const minusBtn = document.querySelector("#minus");
const enterBtn = document.querySelector("#enter");
const clearEntryBtn = document.querySelector("#clear-entry");
const clearAllBtn = document.querySelector("#clear-all")

// Selectors for display elements
const lowerDisplay = document.querySelector(".lower-display")
const upperDisplay = document.querySelector(".upper-display")

// Variables to store the first number, operation sign, second number, helper number, result, operation identifiers, iteration count, and operator clicked status
let firstNum = "";
let operationSign = "";
let helperNum = "";
let result = 0;
let operationIdent = ["+", "-", "*", "/"];
let iteration = 1;
let operatorClicked = false;
let resultDisplayed = false;
let allwoClearEntry = true;

// Function that clears upper and lower display after another button is clicked
// after enter button


function manageCalculatorLogic(e){
    // Check if the clicked button is an operator
    if (operationIdent.includes(e.target.value)) {

        // If this is the first time an operator is clicked
        if (iteration === 1) {

            //save operator
            operationSign = e.target.value;

            // Save the first part of the calculation into helperNum variable
            helperNum = calculateOperation(firstNum, operationSign)


            // Increment the iteration count
            iteration += 1;
        } else {
            // If this is not the first time an operator is clicked
            operationSign = e.target.value;
            result = helperNum(firstNum);
            upperDisplay.textContent = `${result} ${operationSign}`;
            lowerDisplay.textContent = "";
            helperNum = calculateOperation(result, operationSign);
        }


    }
}


function enterBtnEndCalculation(e){
    // If the equals button is clicked, end the calculation
    if (e.target.value === "=") {
        lowerDisplay.textContent = "";
        result = helperNum(firstNum);
        lowerDisplay.textContent = result;
        iteration = 1;
        resultDisplayed = true;
        allwoClearEntry = false;
    }
}

function clearAfterEnter(e) {
    if (!isNaN(e.target.textContent) && resultDisplayed) {
        lowerDisplay.textContent = "";
        upperDisplay.textContent = "";
        resultDisplayed = false;
        allwoClearEntry = true;
    }
}

function multiNumericHandler(e) {
    if (!isNaN(e.target.textContent)) {
        if (operatorClicked) {
            // If the previous button clicked was an operator, clear firstNum
            firstNum = e.target.textContent;
            operatorClicked = false;
        } else {
            // If the previous button clicked was not an operator, append the clicked button's text to firstNum
            firstNum = (firstNum || "") + e.target.textContent;
        }
    } else {
        // If the clicked button's text is not a number, set operatorClicked to true
        operatorClicked = true;
    }
}



// Function to calculate the result based on the operator
function calculateOperation(a, operator) {
    return function (b) {
        let numA = parseInt(a);
        let numB = parseInt(b);
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




//Function to clear one number
function clearEntry() {
    if(allwoClearEntry){
        firstNum = firstNum.slice(0, -1);
        lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
    }
        

}

function clearAll() {
    firstNum = "";
    operationSign = "";
    helperNum = "";
    result = 0;
    iteration = 1;
    lowerDisplay.textContent = "";
    upperDisplay.textContent = "";

}



// Add click event listeners to all buttons to call the displayNumber function when clicked
zeroBtn.addEventListener("click", displayNumber);
oneBtn.addEventListener("click", displayNumber);
twoBtn.addEventListener("click", displayNumber);
threeBtn.addEventListener("click", displayNumber);
fourBtn.addEventListener("click", displayNumber);
fiveBtn.addEventListener("click", displayNumber);
sixBtn.addEventListener("click", displayNumber);
sevenBtn.addEventListener("click", displayNumber);
eightBtn.addEventListener("click", displayNumber);
nineBtn.addEventListener("click", displayNumber);
commaBtn.addEventListener("click", displayNumber);
plusBtn.addEventListener("click", displayNumber);
minusBtn.addEventListener("click", displayNumber);
divideBtn.addEventListener("click", displayNumber);
multiplyBtn.addEventListener("click", displayNumber);
enterBtn.addEventListener("click", displayNumber);


clearEntryBtn.addEventListener("click", clearEntry);
clearAllBtn.addEventListener("click", clearAll);
