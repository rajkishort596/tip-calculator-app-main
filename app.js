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

const selectBtn = (btn) => {
  TipBtns.forEach((btns) => {
    btns.classList.remove("selected");
    btn.classList.add("selected");
    tipPercent = btn.value;
  });
};
const validateForm = (event) => {
  event.preventDefault();
  if (validateBillInput() && validateNoPeople()) {
    calculate();
    resetBtn.classList.add("active");
    return true;
  } else {
    resetBtn.classList.remove("active");
    return false;
  }
};

TipBtns.forEach((item) => {
  item.addEventListener("click", (event) => {
    selectBtn(item);
    customInput.value = "";
    validateForm(event);
  });
});
customInput.addEventListener("input", (event) => {
  TipBtns.forEach((btns) => {
    btns.classList.remove("selected");
  });
  customInput.style.border = `2px solid ${cyanColor}`;
  customInput.style.color = correctColor;
  tipPercent = parseInt(customInput.value);
  validateForm(event);
});
const validateBillInput = () => {
  billvalue = billInput.value;
  if (isNaN(billvalue)) {
    billInput.style.border = `2px solid ${errorColor}`;
    return false;
  } else {
    billInput.style.color = correctColor;
    billInput.style.border = `2px solid ${cyanColor}`;
    billInput.textContent = billInput.value;
    billvalue = parseFloat(billInput.value);
    return true;
  }
};
billInput.addEventListener("input", (event) => {
  validateBillInput();
  validateForm(event);
});

const validateNoPeople = () => {
  noOfPerson = persons.value;
  if (noOfPerson == 0) {
    persons.style.border = `2px solid ${errorColor}`;
    ErrorMsg.style.display = "block";
    return false;
  } else if (isNaN(noOfPerson)) {
    persons.style.border = `2px solid ${errorColor}`;
    ErrorMsg.style.display = "none";
    return false;
  } else {
    persons.style.color = correctColor;
    persons.style.border = `2px solid ${cyanColor}`;
    persons.textContent = persons.value;
    noOfPerson = parseFloat(persons.value);
    ErrorMsg.style.display = "none";
    return true;
  }
};

persons.addEventListener("input", (event) => {
  validateNoPeople();
  validateForm(event);
});

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
