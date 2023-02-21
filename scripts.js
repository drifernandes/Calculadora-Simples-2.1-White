'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=number]');
const operadores = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operador;
let lastNumber;

const operacaoPendente = () => operador !== undefined;
const calcular = () =>{
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
        if (operador == '+'){
            atualizarDisplay(lastNumber + numeroAtual);
        }else if (operador == '-'){
            atualizarDisplay(lastNumber - numeroAtual);
        }else if (operador == '*'){
            atualizarDisplay(lastNumber * numeroAtual);
        }else if (operador == '/'){
            atualizarDisplay(lastNumber / numeroAtual);
        }else if (operador == '%'){
            atualizarDisplay(lastNumber * numeroAtual/100);
        }
    }
}

const atualizarDisplay = (texto) => {
    if (newNumber){
        display.textContent = texto.toLocaleString('BR');
        newNumber = false;
    }else{
        display.textContent += texto;
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!newNumber) {
    calcular();
    newNumber = true;
    operador = evento.target.textContent;
    lastNumber = parseFloat(display.textContent.replace(',','.'));
    }  
}
operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

const equalActive = () =>{
    calcular ();
    operador = undefined;
}

document.getElementById('equal').addEventListener('click', equalActive);

const clearLast = () => display.textContent = '';
document.getElementById('clearLast').addEventListener('click', clearLast);

const clearAll = () => {
    clearLast();
    operador = undefined;
    newNumber = true;
    lastNumber = undefined;
}
document.getElementById('clearAll').addEventListener('click', clearAll);

const removeLast = () => display.textContent = display.textContent.slice (0, -1);
document.getElementById('backspace').addEventListener('click', removeLast);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existevalor = () => display.textContent.length > 0;
const insertDecimal = () => {
    if (!existeDecimal ()){
        if(existevalor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal);

const KeyboardMap = {
    "0"  : 'number0',
    "1"  : 'number1',
    "2"  : 'number2',
    "3"  : 'number3',
    "4"  : 'number4',
    "5"  : 'number5',
    "6"  : 'number6',
    "7"  : 'number7',
    "8"  : 'number8',
    "9"  : 'number9',
    "/"  : 'operadorDiv',
    "*"  : 'operadorMult',
    "-"  : 'operadorSub',
    "+"  : 'operadorPlus',
    "="  : 'equal',
    "c"  : 'clearAll',
    ","  : 'decimal',
    "%"  : 'operadorPerc',
    "Enter" : 'equal',
    "Backspace" : 'backspace',
    "Escape" : 'clearLast',
}

const KeyboardMappin = (evento) => {
   const tecla = evento.key;

   const teclaPermitida = () => Object.keys(KeyboardMap).indexOf(tecla)!== -1;
   if(teclaPermitida()) document.getElementById(KeyboardMap[tecla]).click();
}
document.addEventListener('keydown', KeyboardMappin);
