function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };
function powerOf(a, b) { return a ** b};

const result = document.querySelector('.result');
const format = result.innerText.split(' ');
const value = document.querySelector('.expression');
let expression = ['0'];
let ans = 0;
const operations = {
    '^': powerOf,
    '*': multiply,
    '/': divide,
    '+': add,
    '-': subtract
}
const operators = Object.keys(operations);

window.addEventListener('keydown', handleKey);

const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(button=>{
    button.addEventListener('click', handleBtn)
})

function handleKey(e){
    handleValue(e.key);
}

function handleBtn(e){
    handleValue(e.target.value)
    e.target.blur();
}

function handleValue(v){
    switch(v){
        case "=": evaluate(expression); break;
        case "Enter": evaluate(expression); break;
        case "Backspace": remove(); break;
        case "clear" : expression = ['0'];
        case "ans" : addKey(ans);
        default: addKey(v);
    }
    print();
}

function print(){
    value.innerText = expression.join(' ');
}

function addKey(key){
    const lastIndex = expression.length-1;
    //added bullet point code here
    if(isNumber(key) || key == '.') addNum(key, lastIndex);
    if(operators.includes(key)) addOp(key, lastIndex);
}

function addNum(num, lastIndex){
    //and here
    if(expression[lastIndex] == '0' && num != '.'){
        expression[lastIndex] = num;
    } else if(isNumber(expression[lastIndex]) || num == '.'){
        expression[lastIndex] += num;
    } else {
        expression.push(num);
    }
}

function isNumber(n){
    return !Number.isNaN(Number(n));
}

function addOp(op, lastIndex){
    if(expression[lastIndex] == op) return;

    if(operators.includes(expression[lastIndex])){
        expression[lastIndex] = op;
    } else{
        expression.push(op);
    }
}

function evaluate(){
    if(operators.includes(expression[expression.length-1])) remove();
    for(let key in operations){
        evalOp(key, operations[key]);
    }
    ans = expression[0].toString();
    format[format.length-1] = ans;
    result.innerText = format.join(' ');
}

function evalOp(op, meth){
    while(expression.includes(op)){
        const i = expression.indexOf(op);
        const a = expression[i-1];
        const b = expression[i+1];
        expression.splice(i-1, 3, meth(Number(a), Number(b)));
    }
}

function remove(){
    if(expression.length == 1 && expression[0].length == 1){
        expression[0] = 0;
    } else if (expression.length == 1 && expression[0] == 0){
        return
    } else if (expression[expression.length-1].length > 1){
        expression[expression.length-1] = expression[expression.length-1].slice(0, -1);
    } else {  
        expression.pop();
    }
    print()
}

