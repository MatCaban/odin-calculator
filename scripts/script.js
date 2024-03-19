//selectors for all buttons
const zeroBtn = document.querySelector("#b0");
const lowerDisplay = document.querySelector(".lower-display")


//write number of selected button into display
function displayNumber(e){
    console.log(e.target.textContent);
    lowerDisplay.textContent += e.target.textContent;
}


zeroBtn.addEventListener("click", displayNumber);