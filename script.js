function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };
function powerOf(a, b) { return a ** b};

const result = document.querySelector('.result');
const value = document.querySelector('.expression')
const expression = ['0'];
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
        default: addKey(v);
    }
    print();
}

function print(){
    value.innerText = expression.join(' ');
}

function addKey(key){
    const lastIndex = expression.length-1;
    if(isNumber(key)) addNum(key, lastIndex);
    if(operators.includes(key)) addOp(key, lastIndex);
    console.log(expression)
}

function addNum(num, lastIndex){
    if(expression[lastIndex] == '0'){
        expression[lastIndex] = num;
    } else if(isNumber(expression[lastIndex])){
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
    (expression.length == 1) ? expression[0] = 0 : expression.pop();
    value.innerText = expression.join(' ');
}

