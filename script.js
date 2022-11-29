function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };
function powerOf(a, b) { return a ** b};

const value = document.querySelector('.value');
const operators = ['+', '-', '*', '/', '**', '^'];
let ex = ['0'];

window.addEventListener('keydown', handleKey);

function handleKey(e){
    switch(e.key){
        case "=": evaluate(ex); break;
        case "Enter": evaluate(ex); break;
        case "Backspace": remove(); break;
        default: addKey(e.key);
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

function isNumber(n){
    return !Number.isNaN(Number(n));
}

function evaluate(ex){
    if(operators.includes(ex[ex.length-1])) remove();
    console.log(ex)
}

function remove(){
    (ex.length == 1) ? ex[0] = 0 : ex.pop();
    value.innerText = ex.join(' ');
}

