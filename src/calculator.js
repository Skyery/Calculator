class Calculator {
    constructor(cur, pre) {
        this.curElement = cur;
        this.preElement = pre;
        this.clear();
    }
    clear() {
        this.curOprand = '';
        this.preOprand = '';
        this.operation = undefined;
    }
    backSpace() {
        this.curOprand = this.curOprand.toString().slice(0, -1);
    }
    operatorSelect(opra) {
        if (this.curOprand === '' || this.curOprand === '.') return;
        if (this.preOprand !== '') {
            this.compute();
        }
        this.operation = opra;
        this.preOprand = this.curOprand;
        this.curOprand = '';
    }
    addNumbers(num) {
        let str = this.curOprand.toString();
        if (num === '.' && str.includes('.')) return;
        this.curOprand = str + num.toString();
    }
    displayNumber(num) {
        const strNum = num.toString();
        const int = parseFloat(strNum.split('.')[0]);
        const dec = strNum.split('.')[1];
        let intDisplay;
        if (isNaN(int)) {
            intDisplay = '';
        } else {
            intDisplay = int.toLocaleString();
        }
        if (dec != null) {
            return `${intDisplay}.${dec}`;
        } else {
            return intDisplay;
        }
    }
    updataDisplay() {
        this.curElement.innerHTML = this.displayNumber(this.curOprand);
        if (this.operation != null) {
            this.preElement.innerHTML = `${this.displayNumber(this.preOprand)} ${this.operation}`;
        } else {
            this.preElement.innerHTML = '';
        }
    }
    compute() {
        let computation;
        let curr = parseFloat(this.curOprand);
        let prev = parseFloat(this.preOprand);
        if (isNaN(curr) || isNaN(prev)) return;
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
            case 'Xⁿ':
                computation = prev ** curr;
                break;
            case '％':
                computation = prev % curr;
                break;
            default:
                break;
        }
        this.curOprand = computation;
        this.operation = undefined;
        this.preOprand = '';
    }
}

const curElement = document.querySelector('[data-cur]');
const preElement = document.querySelector('[data-pre]');
const numbersBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const clearBtn = document.querySelector('[data-clear]');
const backspaceBtn = document.querySelector('[data-backspace]');
const equalsBtn = document.querySelector('[data-equals]');

const calculator = new Calculator(curElement, preElement);

numbersBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumbers(button.innerHTML);
        calculator.updataDisplay();
    })
})

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operatorSelect(button.innerHTML);
        calculator.updataDisplay();
    })
})

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updataDisplay();
})

backspaceBtn.addEventListener('click', () => {
    calculator.backSpace();
    calculator.updataDisplay();
})

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updataDisplay();
})


/********************
待處理...
歷史紀錄
0除0 isNaN
四捨五入
負數運算
*********************/