"use strict";

const DECIMAL_PRECISION = 1000;

const add = (num1, num2) => num1 + num2;
const sub = (num1, num2) => num1 - num2;
const mul = (num1, num2) => num1 * num2;
const div = (num1, num2) => num1 / num2;

const apply = (operator, num1, num2) => {
    let result = num1;
    switch (operator) {
        case "add": result = add(num1, num2); break;
        case "sub": result = sub(num1, num2); break;
        case "mul": result = mul(num1, num2); break;
        case "div": result = div(num1, num2); break;
    }
    return Math.round(result * DECIMAL_PRECISION) / DECIMAL_PRECISION;
}

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

const inputQueue = [display.textContent];

const clear = (arr) => {
    while (arr.length > 0) {
        arr.pop();
    }
}

const frontIsEmpty = (arr) => arr.at(-1).length === 0;

buttons.addEventListener("click", (event) => {
    const target = event.target;
    const buttonText = target.textContent;
    let divByZeroError = false;
    if (target.classList.contains("number")) {
        const currentInput = inputQueue.pop();
        inputQueue.push(currentInput === "0" ? buttonText : currentInput + buttonText);
    }

    if (target.classList.contains("operator") && !frontIsEmpty(inputQueue)) {
        if (inputQueue.length == 3) {
            const y = Number.parseFloat(inputQueue.pop());
            const operation = inputQueue.pop();
            const x = Number.parseFloat(inputQueue.pop());

            if (!(operation === "div" && y === 0)) {
                inputQueue.push(apply(operation, x, y).toString());
            } else {
                divByZeroError = true;
                clear(inputQueue);
                inputQueue.push("0");
            }
        }

        if (target.id !== "eq") {
            inputQueue.push(target.id, "");
        }
    }

    if (target.id === "clear") {
        clear(inputQueue);
        inputQueue.push("0");
    }
    
    display.textContent = divByZeroError ? "🐈" : inputQueue.at(frontIsEmpty(inputQueue) ? -3 : -1);
});