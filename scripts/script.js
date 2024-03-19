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


//write number of selected button into display
let firstNum = "";
let operationSign = "";
let secondNum = "";
let isOperatorClicked = false;
const operators = [" X ", " - ", " + ", " / "]

function displayNumber(e){
    if(operators.includes(e.target.textContent)){
        isOperatorClicked = true;
        operationSign = e.target.textContent;
        console.log(`operation: ${operationSign}`);
    }

    if(!isOperatorClicked){
        firstNum += e.target.textContent;
        console.log(`firstNum: ${firstNum}`)
    } else if(e.target.textContent !== operationSign){
        secondNum += e.target.textContent;
        console.log(`secondNum: ${secondNum}`)
    }

    lowerDisplay.textContent += e.target.textContent;

    
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

