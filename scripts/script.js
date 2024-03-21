// Select all buttons from the DOM
const allButtons = document.querySelectorAll("button");


// Add click event listeners to all buttons to call the displayNumber function when clicked
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
let helperNum = "";
let result = 0;
let operationIdent = ["+", "-", "*", "/"];
let iteration = 1;
let operatorClicked = false;
let resultDisplayed = false;
let allwoClearEntry = true;


// Function to manage the logic of the calculator
function manageCalculatorLogic(e){
    // Check if the clicked button is an operator
    if (operationIdent.includes(e.target.value)) {
        allwoClearEntry = false;
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
    allwoClearEntry = true;
}

// Function to handle the equals button click
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

// Function to clear the display after the equals button is clicked
function clearAfterEnter(e) {
    if (!isNaN(e.target.textContent) && resultDisplayed) {
        lowerDisplay.textContent = "";
        upperDisplay.textContent = "";
        resultDisplayed = false;
        allwoClearEntry = true;
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

    console.log(firstNum);

}




// Function to clear the last entered number
function clearEntry() {
    if(allwoClearEntry){
        firstNum = firstNum.slice(0, -1);
        lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
    }
        

}

// Function to clear all inputs and reset the calculator
function clearAll() {
    firstNum = "";
    operationSign = "";
    helperNum = "";
    result = 0;
    iteration = 1;
    lowerDisplay.textContent = "";
    upperDisplay.textContent = "";

}

