import Calculator from './calculator';
import { 
    parseHexToBigInt, 
    parseDecimalToBigInt, 
    formatBigIntToHex, 
    formatBigIntToDecimal, 
    switchSign 
} from './bigint-utils';

const calculator = new Calculator();

const hexInput = document.getElementById('hexInput') as HTMLInputElement;
const decimalInput = document.getElementById('decimalInput') as HTMLInputElement;
const resultDisplay = document.getElementById('resultDisplay') as HTMLElement;

const addButton = document.getElementById('addButton') as HTMLButtonElement;
const subtractButton = document.getElementById('subtractButton') as HTMLButtonElement;
const multiplyButton = document.getElementById('multiplyButton') as HTMLButtonElement;
const divideButton = document.getElementById('divideButton') as HTMLButtonElement;
const signSwitchButton = document.getElementById('signSwitchButton') as HTMLButtonElement;

// Handle hex input changes
hexInput.addEventListener('input', () => {
    try {
        // Make sure the hex input has 0x prefix
        let hexValue = hexInput.value;
        if (!hexValue.startsWith('0x')) {
            hexValue = '0x' + hexValue;
        }
        
        const bigintValue = parseHexToBigInt(hexValue);
        decimalInput.value = formatBigIntToDecimal(bigintValue);
        updateDisplay(bigintValue);
    } catch (error) {
        // If invalid input, don't update the other field
        console.error('Invalid hex input:', error);
    }
});

// Handle decimal input changes
decimalInput.addEventListener('input', () => {
    try {
        const bigintValue = parseDecimalToBigInt(decimalInput.value);
        hexInput.value = formatBigIntToHex(bigintValue).substring(2); // Remove 0x prefix
        updateDisplay(bigintValue);
    } catch (error) {
        // If invalid input, don't update the other field
        console.error('Invalid decimal input:', error);
    }
});

// Operation handlers
addButton.addEventListener('click', () => performOperation('add'));
subtractButton.addEventListener('click', () => performOperation('subtract'));
multiplyButton.addEventListener('click', () => performOperation('multiply'));
divideButton.addEventListener('click', () => performOperation('divide'));

// Sign switch handler
signSwitchButton.addEventListener('click', () => {
    try {
        const bigintValue = parseDecimalToBigInt(decimalInput.value);
        const switchedValue = switchSign(bigintValue);
        
        decimalInput.value = formatBigIntToDecimal(switchedValue);
        hexInput.value = formatBigIntToHex(switchedValue).substring(2); // Remove 0x prefix
        updateDisplay(switchedValue);
    } catch (error) {
        console.error('Error switching sign:', error);
    }
});

// Perform the selected operation
function performOperation(operation: string) {
    try {
        // Get values as bigints
        const value1 = parseDecimalToBigInt(decimalInput.value);
        
        // Get the second value (you might want to implement this differently)
        // For now, let's just use a prompt
        const value2String = prompt('Enter second value:');
        if (!value2String) return;
        
        const value2 = parseDecimalToBigInt(value2String);
        
        let result: bigint;
        
        // Perform the selected operation
        switch (operation) {
            case 'add':
                result = calculator.add(value1, value2);
                break;
            case 'subtract':
                result = calculator.subtract(value1, value2);
                break;
            case 'multiply':
                result = calculator.multiply(value1, value2);
                break;
            case 'divide':
                result = calculator.divide(value1, value2);
                break;
            default:
                throw new Error('Unknown operation');
        }
        
        // Update inputs with result
        decimalInput.value = formatBigIntToDecimal(result);
        hexInput.value = formatBigIntToHex(result).substring(2); // Remove 0x prefix
        
        // Update display
        updateDisplay(result);
    } catch (error) {
        console.error('Error performing operation:', error);
        resultDisplay.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
}

// Update the display with current value and equivalents
function updateDisplay(value: bigint) {
    const hexStr = formatBigIntToHex(value);
    const decStr = formatBigIntToDecimal(value);

    resultDisplay.innerHTML = `
        <div>Hex: ${hexStr} <small style="color: grey;">(${decStr})</small></div>
        <div>Decimal: ${decStr} <small style="color: grey;">(${hexStr})</small></div>
    `;
}