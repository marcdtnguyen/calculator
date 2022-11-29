function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };
function powerOf(a, b) { return a ** b};

const value = document.querySelector('.value');
const operations = {
    '^': powerOf,
    '*': multiply,
    '/': divide,
    '+': add,
    '-': subtract
}
const operators = Object.keys(operations);
let ex = ['0'];

window.addEventListener('keydown', handleKey);

// const digits = document.querySelector('.digits');
// for(let i = 0; i < 10; i++){
//     let digit = document.createElement('button');
//     digit.innerText = i;
//     digit.addEventListener('click', handleBtn);
//     digits.appendChild(digit);
// }

const opBtns = document.querySelector('.operators');

for(let op in operations){
    let opBtn = document.createElement('button');
    opBtn.innerText = op;
    opBtn.addEventListener('click', handleBtn);
    opBtns.appendChild(opBtn);
}

const equal = document.createElement('button');
equal.innerText = '=';
equal.addEventListener('click', handleBtn);
opBtns.appendChild(equal);

function handleKey(e){
    handleValue(e.key);
}

function handleBtn(e){
    handleValue(e.target.innerText)
    e.target.blur();
}

function handleValue(v){
    switch(v){
        case "=": evaluate(ex); break;
        case "Enter": evaluate(ex); break;
        case "Backspace": remove(); break;
        default: addKey(v);
    }
    print();
}

function print(){
    value.innerText = ex.join(' ');
}

function addKey(key){
    const lastIndex = ex.length-1;
    if(isNumber(key)) addNum(key, lastIndex);
    if(operators.includes(key)) addOp(key, lastIndex);
    console.log(ex)
}

function addNum(num, lastIndex){
    if(ex[lastIndex] == '0'){
        ex[lastIndex] = num;
    } else if(isNumber(ex[lastIndex])){
        ex[lastIndex] += num;
    } else {
        ex.push(num);
    }
}

function isNumber(n){
    return !Number.isNaN(Number(n));
}

function addOp(op, lastIndex){
    if(ex[lastIndex] == '*' && op == '*') {
        ex[lastIndex] = '^';
        return;
    };

    if(ex[lastIndex] == op) return;

    if(operators.includes(ex[lastIndex])){
        ex[lastIndex] = op;
    } else{
        ex.push(op);
    }
}

function evaluate(ex){
    if(operators.includes(ex[ex.length-1])) remove();
    for(let key in operations){
        evalOp(key, operations[key]);
    }
}

function evalOp(op, meth){
    while(ex.includes(op)){
        const i = ex.indexOf(op);
        const a = ex[i-1];
        const b = ex[i+1];
        ex.splice(i-1, 3, meth(Number(a), Number(b)));
    }
}

function remove(){
    (ex.length == 1) ? ex[0] = 0 : ex.pop();
    value.innerText = ex.join(' ');
}

