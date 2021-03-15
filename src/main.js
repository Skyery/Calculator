class Calculator {
    constructor(cur, pre, Arr) {
        this.hisArr = Arr;
        this.curElement = cur;
        this.preElement = pre;
        this.clear();
    }
    clear() {
        this.hisOperand = '';
        this.curOperand = '';
        this.preOperand = '';
        this.operation = undefined;
        this.hisArr.forEach(button => {
            button.innerText = this.hisOperand;
        })
    }
    backspace() {
        this.curOperand = this.curOperand.toString().slice(0, -1);
    }
    addNumber(num) {
        if (num === '.' && this.curOperand.includes('.')) return;
        this.curOperand = this.curOperand.toString() + num.toString();
    }
    addHistory(hisAffix) {
        this.hisOperand = hisAffix.toString();
        this.historySelect().innerText = this.hisOperand;
    }
    historySelect() {
        for (let i = 0; i < this.hisArr.length; i++) {
            if (this.hisArr[i].innerText === '') {
                return this.hisArr[i];
            } else if (i === this.hisArr.length - 1) {
                this.hisArr.forEach(button => {
                    button.innerText = '';
                })
                return this.hisArr[i - (this.hisArr.length - 1)];
            }
        }
    }
    operatorSelect(operation) {
        if (this.curOperand === '') return;
        if (this.preOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.preOperand = this.curOperand;
        this.curOperand = '';
    }
    displayNumber(num) {
        const strNum = num.toString();
        const int = parseFloat(strNum.split('.')[0]);
        const dec = strNum.split('.')[1];
        let intDisplay
        if (isNaN(int)) {
            intDisplay = '';
        } else {
            intDisplay = int.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (dec != null) {
            return `${intDisplay}.${dec}`
        } else {
            return intDisplay;
        }
    }
    updataDisplay() {
        this.curElement.innerText = this.displayNumber(this.curOperand);
        if (this.operation != null) {
            this.preElement.innerText = `${this.displayNumber(this.preOperand)} ${this.operation}`;
        } else {
            this.preElement.innerText = '';
        }
    }
    compute() {
        let computation;
        let historyaffix;
        const prev = parseFloat(this.preOperand)
        const curr = parseFloat(this.curOperand)
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '×':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            case '％':
                computation = prev % curr;
                break;
            case 'Xⁿ':
                computation = prev ** curr;
                break;
            default:
                return;
        }
        historyaffix = `${prev}${this.operation}${curr}=${computation}`;
        this.addHistory(historyaffix);
        this.curOperand = computation;
        this.operation = undefined;
        this.preOperand = '';
    }
}

const numbtns = document.querySelectorAll('[data-number]');
const operatorbtns = document.querySelectorAll('[data-operator]');
const equalsbtn = document.querySelector('[data-equals]');
const backspacebtn = document.querySelector('[data-backspace]');
const clearbtn = document.querySelector('[data-clear]');
const curElement = document.querySelector('[data-cur]');
const preElement = document.querySelector('[data-pre]');
const hisArr = document.querySelectorAll('[data-history]');

const calculator = new Calculator(curElement, preElement, hisArr);

numbtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.updataDisplay();
    })
})

operatorbtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operatorSelect(button.innerText);
        calculator.updataDisplay();
    })
})

equalsbtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updataDisplay();
})

clearbtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updataDisplay();
})

backspacebtn.addEventListener('click', button => {
    calculator.backspace();
    calculator.updataDisplay();
})