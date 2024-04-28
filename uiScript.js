const resultDisplay = document.querySelector(".result");
const equationDisplay = document.querySelector(".equation");

export function renderResult(text) {
  resultDisplay.textContent = text;
}

export function renderEquation(text) {
  equationDisplay.textContent = text;
}
