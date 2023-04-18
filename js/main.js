// Get the input elements for name, email, and phone number
let nameInputEl = document.querySelector("#name"),
    emailInputEl = document.querySelector("#email"),
    phoneInputEl = document.querySelector("#phone");

// Get the label elements for name, email, and phone number
let nameLabelEl = document.querySelector("[for='name'] span"),
    emailLabelEl = document.querySelector("[for='email'] span"),
    phoneLabelEl = document.querySelector("[for='phone'] span");

// Regular expressions for email and phone number input validation
const emailMatchingRegex = /\w+\@\w+\.\w+/i;
const phoneMatchingRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

// Add event listeners for input validation
nameInputEl.addEventListener("blur", function() {
    validateField(this, nameLabelEl, "span-field");
    validateField(this, this, "input-field");
    checkMailFocus();
});
emailInputEl.addEventListener("blur", function() {
    validateInput(this, emailLabelEl, emailMatchingRegex, "span-field", "input-field");
});
phoneInputEl.addEventListener("blur", function() {
    validateInput(this, phoneLabelEl, phoneMatchingRegex,"span-field", "input-field");
});

// Focus on name input when the page loads
window.onload = focusOnNameInput;
function focusOnNameInput() {
    nameInputEl.focus();
};
// Focus on email input if the name input is not empty
function checkMailFocus(){
    if (!nameInputEl.classList.contains("input-field")){
        emailInputEl.focus();
    };
};
// Focus on phone number input if the email input is not empty
function checkPhoneFocus(){
    if (!emailInputEl.classList.contains("input-field")){
        phoneInputEl.focus();
    };
};

// Functions for input validation
function validateField(ele, el, className) {
    if (ele.value == ""){
        el.classList = className;
    } else {
        el.classList.remove(className);
    };
};
function validateInput(input, span, match, spanClass, inputClass){
    if (!input.value.match(match) || input.value == ""){
        span.classList= spanClass;
        input.classList= inputClass;
    } else {
        span.classList.remove(spanClass);
        input.classList.remove(inputClass);
    };
};

// Get all info divs, next and back buttons
let infoDivs = document.querySelectorAll(".all"),
    stepNumbers = document.querySelectorAll(".num"),
    nextButtonEl = document.querySelector(".next"),
    backButtonEl = document.querySelector(".back");

// Convert the info divs NodeList to an array
let infoDivsArray = Array.from(infoDivs);

// Index of the current step
let currentStepIndex = 0;

// Add event listeners to the next and back buttons
let isInvalidInput = false;
nextButtonEl.addEventListener("click", () => {
    markInvalidInputs();
    checkForInvalidFields();
    if (isInvalidInput == false) {
        return false;
    };
    slideToNextStep();
    updateSelectedPlanName();
    updateSelectedBillingPeriod();
    updateSelectedPlanPrice();
    updateTotalServicePrice();
    countTotalPrice();
    updateSelectedBillingPeriodCheckElement(forBillingPeriodCheckElement, "mo", "yr");
});
backButtonEl.addEventListener("click", slideToPreviousStep);

// Check if any fields are empty and mark them as invalid
function checkForInvalidFields(){
    if (
        !nameLabelEl.classList.contains("span-field")
        || !emailLabelEl.classList.contains("span-field")
        || !phoneLabelEl.classList.contains("span-field")
    ){
        isInvalidInput = true;
    }
}

// Move to the next info div and update the step number indicator
function slideToNextStep(){
    currentStepIndex++;
    if (currentStepIndex >= infoDivs.length - 1){
        nextButtonEl.textContent = "Confirm";
    };
    if (currentStepIndex >= infoDivs.length){
        document.querySelector(".thank").classList.add("show");
        return false;
    };
    if (currentStepIndex > 0){
        backButtonEl.classList.remove("close-button");
    };

    for (let i = 0; i < infoDivsArray.length; i++){
        infoDivsArray[i].classList.remove("active");
        stepNumbers[i].classList.remove("active");
        infoDivsArray[currentStepIndex].classList.add("active");
    };
    stepNumbers[currentStepIndex].classList.add("active");
};
// Check if any of the input fields are empty or have invalid values when the button is clicked
function markInvalidInputs() {
    const inputs = [nameInputEl, emailInputEl, phoneInputEl];
    const labels = [nameLabelEl, emailLabelEl, phoneLabelEl];
    
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const label = labels[i];
        if (
            !emailInputEl.value.match(emailMatchingRegex)
            || !phoneInputEl.value.match(phoneMatchingRegex)
            || nameInputEl.value == ""
        ){
            input.classList.add("input-field");
            label.classList.add("span-field");
        } else {
            input.classList.remove("input-field");
            label.classList.remove("span-field");
        }
    }
};

// Change the info div when the back button is clicked
function slideToPreviousStep(){
    currentStepIndex--;
    if (currentStepIndex == 0){
        this.classList.add("close-button");
    };
    if (currentStepIndex < infoDivsArray.length - 1){
        nextButtonEl.textContent = "Next Step";
    };

    for (let i = 0; i < infoDivsArray.length; i++){
        infoDivsArray[i].classList.remove("active");
        stepNumbers[i].classList.remove("active");
    };
    infoDivsArray[currentStepIndex].classList.add("active");
    stepNumbers[currentStepIndex].classList.add("active");
};

// step number 2
// Select all plan option elements
let planOptions = document.querySelectorAll(".options");

// Add click event listener to each plan option
planOptions.forEach(function(option){
    option.addEventListener("click", function(){
        // Remove the "choose-it" class from all plan options
        removeSelectedClass();

        // Add the "choose-it" class to the clicked plan option
        addSelectedClass(this);
    });
});

// Function to remove the "choose-it" class from all plan options
function removeSelectedClass(){
    for (i = 0; i < planOptions.length; i++){
        planOptions[i].classList.remove("choose-it");
    };
};

// Function to add the "choose-it" class to a given element
function addSelectedClass(ele){
    ele.classList.add("choose-it");
};

//Select relevant elements
let monthYearClick = document.querySelector(".mo-yr"),
    incrementCircle = document.querySelector(".mo-yr .crcl"),
    monthlyParagraph = document.querySelector(".click .month"),
    yearlyParagraph = document.querySelector(".click .year"),
    billingDivs = document.querySelectorAll(".opt-title"),
    salaries = document.querySelectorAll(".opt-title .sallery"),
    billingPeriods = document.querySelectorAll(".opt-title .plan"),
    selectBilling = document.querySelectorAll(".selected .select-billing"),
    selectPrice = document.querySelectorAll(".selected .price");
    

// Add click event listener to "Monthly/Yearly" toggle button
monthYearClick.addEventListener("click", function(){
    const sall = 2;
    toggleIncrementCircle();
    toggleActiveBilling();
    adjustSalaries(sall);
    updateBillingPeriod();
    makeFreeMonthsElement(sall); // add paragraph showing free months
    adjustSelectedPrice(sall); // update the price in step number 3
    updateBillingPeriodSelected(); // update the billing period selected in step number 3
});

// Toggles the position of the increment circle between left and right
function toggleIncrementCircle(){
    incrementCircle.classList.toggle("right");
    incrementCircle.classList.toggle("left");
};

// Toggles the active billing period between monthly and yearly
function toggleActiveBilling(){
    monthlyParagraph.classList.toggle("cth-click");
    yearlyParagraph.classList.toggle("cth-click");
};

// Adjusts the salaries displayed based on the selected billing period
function adjustSalaries(el){
    if (yearlyParagraph.classList.contains("cth-click")){
        salaries.forEach(function(e){
            e.textContent = `${Number(e.textContent)  * (12 - el)}`;
        });
    } else {
        salaries.forEach(function(e){
            e.textContent = `${Number(e.textContent) / (12 - el)}`;
        });
    };
};

// Updates the billing period displayed based on the selected period
function updateBillingPeriod(){
    if (yearlyParagraph.classList.contains("cth-click")){
        billingPeriods.forEach(function(e){
            e.textContent = `yr`;
        });
    } else {
        billingPeriods.forEach(function(e){
            e.textContent = `mo`;
        });
    };
};

// Adds a paragraph to billingDivs showing the number of free months
function makeFreeMonthsElement(el){
    if (yearlyParagraph.classList.contains("cth-click")) {
        for (i = 0; i < billingDivs.length; i++){
            let paragraph = document.createElement("p");
            paragraph.className = "last-p";
            let paragraphText = document.createTextNode(`${el} monthes free`);

            paragraph.appendChild(paragraphText);
            billingDivs[i].appendChild(paragraph);
        }
    };
    if (!yearlyParagraph.classList.contains("cth-click")){
        for (i = 0; i < billingDivs.length; i++){
            document.querySelectorAll(".opt-title .last-p").forEach((e)=>{e.remove()})
        }
    };
};

// step number 3
// Get all elements with class "selected"
let selectedEle = document.querySelectorAll(".selected");

// Add click event listener to each selected element
selectedEle.forEach(function(e){
    e.addEventListener("click", function(){
        // Get the input element associated with the clicked element
        const selectedInput = document.querySelector(`.${this.classList[0]} input`);
        // Toggle the "checked" state of the input element
        toggleChecked(selectedInput);
        // Toggle the "active" state of the clicked element based on the state of the input element
        toggleActiveState(this, selectedInput);
    });
});

// Function to simulate a click event on an element
function toggleChecked(ele) {
    ele.click();
}

// Function to toggle the "active" state of an element based on the "checked" state of an associated input element
function toggleActiveState(el, ele){
    if (ele.checked) {
        el.classList.add("checked");
    }
    if (!ele.checked) {
        el.classList.remove("checked");
    }
}

// Function to adjust the price based on the selected billing period
function adjustSelectedPrice(el){
    // If yearly billing is selected, update prices to reflect discount
    if (yearlyParagraph.classList.contains("cth-click")){
        selectPrice.forEach(function(e){
            e.textContent = `${Number(e.textContent) * (12 - el)}`;
        });
    } 
    // If monthly billing is selected, update prices to reflect standard pricing
    if (!yearlyParagraph.classList.contains("cth-click")){
        selectPrice.forEach(function(e){
            e.textContent = `${Number(e.textContent) / (12 - el)}`;
        });
    };
};

// Function to update the text of the billing period selection based on the selected billing period
function updateBillingPeriodSelected(){
    // If yearly billing is selected, update text to "yr"
    if (yearlyParagraph.classList.contains("cth-click")){
        selectBilling.forEach(function(e){
            e.textContent = `yr`;
        });
    };
    // If monthly billing is selected, update text to "mo"
    if (!yearlyParagraph.classList.contains("cth-click")) {
        selectBilling.forEach(function(e){
            e.textContent = `mo`;
        });
    };
};

// check step

// DOM element selectors
let planNameElement = document.querySelector(".plan-name"),
    billingPeriodElement = document.querySelector(".billing-period"),
    selectedPlanPriceElement = document.querySelector(".check p"),
    selectedBillingPeriodCheck = document.querySelector("#billing-period-check"),
    selectCountPriceCheckElement = document.querySelector("#total-price"),
    forBillingPeriodCheckElement = document.querySelector("#for-period");

// Update selected plan name in the UI
function updateSelectedPlanName(){
    if (currentStepIndex == infoDivs.length - 1) {
        // Get the selected plan name from the UI
        const selectedPlanName = document.querySelector(".choose-it .opt-title h2").textContent;
        planNameElement.textContent = selectedPlanName; 
    }; 
};

// Update selected billing period in the UI
function updateSelectedBillingPeriod(){
    // Get the selected billing period element from the UI
    const selectedBillingPeriod = document.querySelector(".click .month");
    // Define constants for the billing periods
    const monthLabel  = "month";
    const yearLabel  = "year";
    // Check if current step is the last step
    if (currentStepIndex == infoDivs.length -1){
        // Check if the selected billing period is monthly
        if(selectedBillingPeriod.classList.contains("cth-click")){
            billingPeriodElement.textContent = monthLabel;// Update the billing period element with month
        };
        // Check if the selected billing period is yearly
        if(!selectedBillingPeriod.classList.contains("cth-click")){
            billingPeriodElement.textContent = yearLabel;// Update the billing period element with yearly
        };
    };
    updateSelectedBillingPeriodCheckElement(selectedBillingPeriodCheck, monthLabel, yearLabel);
};

// Update selected plan price in the UI
function updateSelectedPlanPrice() {
    // Get the selected plan price from the UI
    const selectedPlanPrice = document.querySelector(".choose-it .opt-title p").innerHTML;
    selectedPlanPriceElement.innerHTML = selectedPlanPrice;
}

// Get all service price and billing elements from the UI
const allServicePriceElements = document.querySelectorAll(".all-service p span .price"),
    allServiceBillingElements = document.querySelectorAll(".all-service p span .billing"),
    selectedPriceElements = document.querySelectorAll(".selected .price"),
    selectedBillingElements = document.querySelectorAll(".selected .select-billing");

// Update total service price in the UI
function updateTotalServicePrice() {
    for (let i = 0; i < selectedPriceElements.length; i++) {
        // Define variables for
        const selectedService = selectedEle[i];// selected service element
        const totalServicePriceElement = allServicePriceElements[i];// total service price element
        const totalServiceBillingElement = allServiceBillingElements[i];// total service billing element
        const selectedPriceElement = selectedPriceElements[i];// the selected service price element
        const selectedBillingElement = selectedBillingElements[i];// the selected service billing element

        if (selectedService.classList.contains("checked")) {
            totalServicePriceElement.textContent = selectedPriceElement.textContent;
            totalServiceBillingElement.textContent = selectedBillingElement.textContent;
        } else {
            totalServicePriceElement.textContent = "0";
            totalServiceBillingElement.textContent = selectedBillingElement.textContent;
        };
    };
};

// Update selected billing period check element based on user input
function updateSelectedBillingPeriodCheckElement(selectedBillingPeriodCheck, monthLabel, yearLabel){
    const selectedBillingPeriodElement = document.querySelector(".click .month");

    if (currentStepIndex == infoDivs.length -1){
        if(selectedBillingPeriodElement.classList.contains("cth-click")){
            selectedBillingPeriodCheck.textContent = monthLabel;
        };
        if(!selectedBillingPeriodElement.classList.contains("cth-click")){
            selectedBillingPeriodCheck.textContent = yearLabel;
        };
    };
};

function countTotalPrice(){
    if (currentStepIndex == infoDivs.length -1){
        const selectPlanPriceCheck = Number(document.querySelector(".check .sallery").textContent);
        const selectedElementArr = [];
        for (i = 0; i < allServicePriceElements.length; i++){
            selectedElementArr.push(Number(allServicePriceElements[i].textContent));
        }
        const countArr = selectedElementArr.reduce((acc, curr) => acc + curr, 0);
        return selectCountPriceCheckElement.textContent = selectPlanPriceCheck + countArr;
    }
}

// get info's image and text
let windowWidth = window.innerWidth,
    sideBar = document.querySelector(".bkg"),
    sideBarText = document.querySelectorAll(".title");

// when screan lessthan 1024 change image place and some styles
if(windowWidth < 1024){
    sideBar.innerHTML= `<img src="images/bg-sidebar-mobile.png" alt="mobile">`
    sideBarText.forEach((e)=> e.style.display= "none");
    document.querySelector(".add-ons").style.justifyContent="center";
} else {
    sideBar.innerHTML= `<img src="images/bg-sidebar-desktop.png" alt="desktop">`
    sideBarText.forEach((e)=> e.style.display= "inline");
    document.querySelector(".add-ons").style.justifyContent="flex-end";
}

