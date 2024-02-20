const errorColor = "rgb(255, 149, 0)";
const correctColor = "hsl(183, 100%, 15%)";
const cyanColor = "hsl(172, 67%, 45%)";
const billInput = document.querySelector("#amount");
const TipBtns = document.querySelectorAll(".btn");
const persons = document.querySelector("#no-of-people");
const ErrorMsg = document.querySelector(".error-msg");
const TipAmount = document.querySelector(".tip-amount");
const TotalAmount = document.querySelector(".total-amount");
const resetBtn = document.querySelector(".reset");
const customInput = document.querySelector(".custom");
let tipPercent = 0;
let billvalue = 0;
let noOfPerson = 0;
let validBillInput = false;
let validPeopleInput = false;

const validateForm = (event) => {
  event.preventDefault();
  if (validBillInput && validPeopleInput) {
    calculate();
    resetBtn.classList.add("active");
    return true;
  } else {
    resetBtn.classList.remove("active");
    return false;
  }
};
/*------------Selecting tip percentage button-------------------*/
const selectBtn = (btn) => {
  TipBtns.forEach((btns) => {
    btns.classList.remove("selected");
    btn.classList.add("selected");
    tipPercent = btn.value;
  });
};

TipBtns.forEach((item) => {
  item.addEventListener("click", (event) => {
    selectBtn(item);
    customInput.value = "";
    validateForm(event);
  });
});
/*-----------Custom input field validation---------------*/
const validateCustomInput = (event) => {
  const custInputValue = event.target.value;
  const filteredValue = custInputValue.replace(/[^0-9]/g, "");
  event.target.value = filteredValue;
  tipPercent = parseInt(filteredValue);
  customInput.style.border = `2px solid ${cyanColor}`;
  customInput.style.color = correctColor;
  return true;
};
customInput.addEventListener("input", (event) => {
  TipBtns.forEach((btns) => {
    btns.classList.remove("selected");
  });
  validateCustomInput(event);
  validateForm(event);
});
/*-----------bill input field validation---------------*/
const validateBillInput = (event) => {
  const billInputValue = event.target.value;
  const filteredValue = billInputValue.replace(/-?\d+(\.\d{0,2})?/g, "");
  event.target.value = filteredValue;
  billvalue = parseFloat(filteredValue);
  billInput.style.color = correctColor;
  billInput.style.border = `2px solid ${cyanColor}`;
};
billInput.addEventListener("input", (event) => {
  validateBillInput(event);
  validBillInput = true;
  validateForm(event);
});
/*-----------Number of people input field validation---------------*/
const validateNoPeople = (event) => {
  const peopleInputValue = event.target.value;
  const filteredValue = peopleInputValue.replace(/[^0-9]/g, "");
  event.target.value = filteredValue;
  noOfPerson = parseFloat(filteredValue);
  if (event.target.value == "") {
    TipAmount.textContent = "$0.00";
    TotalAmount.textContent = "$0.00";
    validPeopleInput = false;
  } else if (noOfPerson === 0) {
    persons.style.border = `2px solid ${errorColor}`;
    ErrorMsg.style.display = "block";
    TipAmount.textContent = "$0.00";
    TotalAmount.textContent = "$0.00";
    validPeopleInput = false;
  } else if (isNaN(peopleInputValue)) {
    persons.style.border = `2px solid ${errorColor}`;
    ErrorMsg.style.display = "none";
  } else {
    persons.style.color = correctColor;
    persons.style.border = `2px solid ${cyanColor}`;
    ErrorMsg.style.display = "none";
    validPeopleInput = true;
  }
};
persons.addEventListener("input", (event) => {
  validateNoPeople(event);
  validateForm(event);
});
/*-----------calculate tip function-----------*/
const calculate = () => {
  let tipPerPerson;
  let totalPerPerson;
  tipPerPerson = (billvalue * tipPercent) / (100 * noOfPerson);
  totalPerPerson = billvalue / noOfPerson + tipPerPerson;
  tipPerPerson = parseFloat(tipPerPerson).toFixed(2);
  totalPerPerson = parseFloat(totalPerPerson).toFixed(2);
  TipAmount.textContent = "$" + tipPerPerson;
  TotalAmount.textContent = "$" + totalPerPerson;
};
/*-----------Reset button event--------------*/
resetBtn.addEventListener("click", () => {
  TipBtns.forEach((btns) => {
    btns.classList.remove("selected");
  });
  resetBtn.classList.remove("active");
  tipPercent = 0;
  billvalue = 0;
  noOfPerson = 0;
  TipAmount.textContent = "$0.00";
  TotalAmount.textContent = "$0.00";
});
