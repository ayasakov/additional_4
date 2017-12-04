function addNumbers(long, short) {
    const number = [];
    let d = 0;

    for (let i = long.length - 1; i >= 0; i--) {
        const a = long[i];
        const b = short[i] || 0;
        const [current, rest] = getRest(+a + +b + d);
        d = rest;
        number.push(current);
    }
    number.push(d);
    return number.reverse().join('');
}

function multByNumber(long, num) {
    const number = [];
    let d = 0;

    for (let i = long.length - 1; i >= 0; i--) {
        const a = long[i];
        const [current, rest] = getRest((+a * num) + d);
        d = rest;
        number.push(current);
    }

    number.push(d);
    return number.reverse().join('');
}

function additionalNumbers(long, short) {
    const numbers = [];
    for (let i = long.length - 1; i >= 0; i--) {
        const b = short[i] || 0;
        let current = multByNumber(long, +b);
        for (let j = i; j < long.length - 1; j++) {
            current = current + '0';
        }

        numbers.push(current);
    }

    let sum = '0';
    for (let s = 0; s < numbers.length; s++) {
        const [a, b] = getString(sum, numbers[s]);
        sum = addNumbers(a, b);
    }

    let zeroPosition = 0;
    while (+sum[zeroPosition] === 0) {
        zeroPosition++;
    }

    return sum.substring(zeroPosition);
}

function getRest(number) {
    let d = 0;
    let cNumber = number;
    if (number > 9) {
        d = Math.floor(number / 10);
        cNumber = number % 10;
    }

    return [cNumber, d];
}

function getString(first, second) {
    const d = first.length - second.length;
    if (d > 0) {
        for (let i = 0; i < d; i++) {
            second = '0' + second;
        }
    } else {
        for (let i = 0; i < Math.abs(d); i++) {
            first = '0' + first;
        }
    }

    return [first, second];
}

module.exports = function multiply(first, second) {
    const [long, short] = getString(first, second);
    return additionalNumbers(long, short);
};
