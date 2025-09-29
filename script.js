const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    
    if (value === "C") {
      currentInput = "";
      display.value = "";
    } else if (value === "=") {
      calculate();
    } else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// Safe evaluation
function calculate() {
  try {
    const expression = currentInput.replace(/%/g, "/100");
    currentInput = Function('"use strict"; return (' + expression + ")")().toString();
    display.value = currentInput;
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (/[0-9+\-*/().%]/.test(e.key)) {
    currentInput += e.key;
    display.value = currentInput;
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (e.key.toLowerCase() === "c") {
    currentInput = "";
    display.value = "";
  }
});
