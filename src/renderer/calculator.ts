class Calculator {
    add(a: bigint, b: bigint): bigint {
        return a + b;
    }

    subtract(a: bigint, b: bigint): bigint {
        return a - b;
    }

    multiply(a: bigint, b: bigint): bigint {
        return a * b;
    }

    divide(a: bigint, b: bigint): bigint {
        if (b === 0n) {
            throw new Error("Division by zero");
        }
        return a / b;
    }

    hexToDecimal(hex: string): bigint {
        return BigInt(hex);
    }

    decimalToHex(decimal: bigint): string {
        return decimal.toString(16);
    }

    switchSign(value: bigint): bigint {
        return -value;
    }
}

export default Calculator;