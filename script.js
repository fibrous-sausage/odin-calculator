"use strict";

const add = (num1, num2) => num1 + num2;
const sub = (num1, num2) => num1 - num2;
const mul = (num1, num2) => num1 * num2;
const div = (num1, num2) => num1 / num2;

const operate = (operator, num1, num2) => {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return sub(num1, num2);
        case "×": return mul(num1, num2);
        case "÷": return div(num1, num2);
        default: return num1;
    }
}