let display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operation = null;

function appendNumber(number) {
  if (currentInput.includes(".") && number === ".") return;
  currentInput = currentInput.toString() + number.toString();
  updateDisplay();
}

function updateDisplay() {
  display.value = currentInput;
  display.classList.remove('pulse');
  void display.offsetWidth;  // Trigger reflow to restart the animation
  display.classList.add('pulse');
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operation = null;
  updateDisplay();
}

function setOperation(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operation = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result;
  operation = null;
  previousInput = "";
  updateDisplay();
  display.classList.add('result');
}

// Adding a click animation to buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 100);
  });
});