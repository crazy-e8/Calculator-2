import "./uiScript.js";
import { renderEquation, renderResult } from "./uiScript.js";

const allKeys = document.querySelectorAll(".key");
const numberKeys = document.querySelectorAll(".number");
const deleteKey = document.querySelector("#delete");
const clearKey = document.querySelector("#clear");
const operatorKeys = document.querySelectorAll(".operator");
const equalsKey = document.querySelector("#equals");

let num1 = 0;
let num2 = 0;
let result = 0;

let operator = "";
let activeNum = 1;

function render() {
  let symbol = getOperationSymbol();

  if (symbol === "*") symbol = "x";

  renderResult(num1);

  if (symbol !== "ERROR" && num2 !== 0) {
    renderEquation(`${num1}${symbol}${num2}`);
  } else if (symbol !== "ERROR" && num2 === 0) {
    renderEquation(`${num1}${symbol}`);
  }
}

function addEventListeners() {
  // number keys
  for (const key of numberKeys) {
    key.addEventListener("click", () => {
      if (activeNum === 1) {
        num1 *= 10;
        num1 += parseInt(key.textContent);
      } else {
        num2 *= 10;
        num2 += parseInt(key.textContent);
      }

      render();
    });
  }

  // delete key
  deleteKey.addEventListener("click", () => {
    num1 /= 10;
    num1 = Math.floor(num1);
    render();
    log();
  });

  // clear key
  clearKey.addEventListener("click", () => {
    num1 = 0;
    num2 = 0;
    result = 0;
    activeNum = 1;
    operator = "";
    render();
    log();
  });

  // operator keys
  for (const key of operatorKeys) {
    key.addEventListener("click", () => {
      operate();
      operator = key.getAttribute("ID");
      render();
    });
  }

  // equals key
  equalsKey.addEventListener("click", operate);
}

function getOperationSymbol() {
  switch (operator) {
    case "add":
      return "+";

    case "substract":
      return "-";

    case "multiply":
      return "*";

    case "divide":
      return "/";

    default:
      return "ERROR";
  }
}

function operate() {
  if (num1 !== 0 && num2 !== 0) {
    result = eval(`${num1}${getOperationSymbol()}${num2}`);
    num1 = result;
    num2 = 0;
  }

  activeNum = 2;
  result = 0;

  render();
  log();
}

function log() {
  console.clear();
  console.log(`${num1}${getOperationSymbol()}${num2}`);
  console.log("---------------------");
  console.log(`num1: ${num1}`);
  console.log(`operation: ${operator}`);
  console.log(`num2: ${num2}`);
  console.log(`activeNum: ${activeNum}`);
  console.log(`result: ${result}`);
  console.log("---------------------");
}

function main() {
  addEventListeners();
}

main();
