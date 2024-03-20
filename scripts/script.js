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




const lowerDisplay = document.querySelector(".lower-display")
const upperDisplay = document.querySelector(".upper-display")

//write number of selected button into display
let firstNum = "";
let operationSign = "";
let secondNum = "";
let helperNum = "";
let result = 0;
let operationIdent = ["+", "-", "*", "/"];
let iteration = 1;
let operatorClicked = false;

function displayNumber(e) {
    //checking if user user + - * /
    if (operationIdent.includes(e.target.value)) {

        // for first time user use operator
        if (iteration === 1) {
           
            //save operator
            operationSign = e.target.value;

            //save first part of calculating function into helperNum variable
            helperNum = calculateOperation(firstNum, operationSign)
        

            // handle escape from if, we want if to run only once
            iteration += 1;
        } else {
            operationSign = e.target.value;
            result = helperNum(firstNum);
            upperDisplay.textContent = `${result} ${operationSign}`;
            lowerDisplay.textContent = "";
            helperNum = calculateOperation(result, operationSign);
        }


    }

    //if = button end calculation
    if(e.target.value == "="){
        lowerDisplay.textContent = "";
        result = helperNum(firstNum);
        lowerDisplay.textContent = result;
        iteration = 1;
    }

    lowerDisplay.textContent += e.target.textContent;

    // need to fix multi numeric numbers

    if (!isNaN(e.target.textContent)) {
        if (operatorClicked) {
            // if previous numner was operator, it will clear first num value
            firstNum = e.target.textContent;
            operatorClicked = false;
        } else {
            firstNum = (firstNum || "") + e.target.textContent;
        }
    } else {
        operatorClicked = true;
    }
    console.log(firstNum);



}


//make callculation based on operation
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

//buttons listener for displaying number
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

