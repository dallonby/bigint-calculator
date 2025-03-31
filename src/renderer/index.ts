import Calculator from './calculator';
import { 
    parseHexToBigInt, 
    parseDecimalToBigInt, 
    formatBigIntToHex, 
    formatBigIntToDecimal, 
    switchSign, 
    interpretHexAsTwosComplement
} from './bigint-utils';

const calculator = new Calculator();

const hexInput = document.getElementById('hexInput') as HTMLInputElement;
const decimalInput = document.getElementById('decimalInput') as HTMLInputElement;
const resultDisplay = document.getElementById('resultDisplay') as HTMLElement;

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

// Sign switch handler
signSwitchButton.addEventListener('click', () => {
    try {
        let bigintValue: bigint;
        
        // Determine which input to use based on which was last edited or has focus
        if (document.activeElement === hexInput && hexInput.value) {
            // Convert hex to BigInt ensuring 0x prefix
            let hexValue = hexInput.value;
            if (!hexValue.startsWith('0x')) {
                hexValue = '0x' + hexValue;
            }
            bigintValue = parseHexToBigInt(hexValue);
        } else if (decimalInput.value) {
            bigintValue = parseDecimalToBigInt(decimalInput.value);
        } else {
            throw new Error('No input value to switch sign');
        }
        
        // Simply negate the value - our formatter will handle two's complement representation
        const switchedValue = -bigintValue;
        
        // Update displays - the formatBigIntToHex function will now properly handle two's complement
        decimalInput.value = formatBigIntToDecimal(switchedValue);
        hexInput.value = formatBigIntToHex(switchedValue).substring(2);
        updateDisplay(switchedValue);
        
    } catch (error) {
        console.error('Error switching sign:', error);
        resultDisplay.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
});

// Update the display function with a more compact template
function updateDisplay(value: bigint): void {
    const hexValue = formatBigIntToHex(value);
    const decValue = formatBigIntToDecimal(value);
    
    // Get the two's complement interpretation of the hex value
    const hexWithoutPrefix = hexValue.substring(2);
    const twosComplementValue = interpretHexAsTwosComplement(hexWithoutPrefix);
    
    // Use a more compact template without extra line breaks
    resultDisplay.innerHTML = 
        `<div class="formatted-result"><div class="result-row"><span class="result-label">Decimal:</span><span class="result-value decimal">${decValue}</span></div><div class="result-row"><span class="result-label">Hex:</span><span class="result-value hex">${hexValue}</span></div><div class="result-row"><span class="result-label">Two's Complement:</span><span class="result-value decimal">${twosComplementValue.toString()}</span></div></div>`;
    
    // After updating the DOM, check for scrollable content
    setTimeout(() => {
        const resultValues = document.querySelectorAll('.result-value');
        resultValues.forEach(el => {
            const element = el as HTMLElement;
            if (element.scrollWidth > element.clientWidth) {
                element.classList.add('scrollable');
                
                // Optional: Add a tooltip
                element.title = "Scroll horizontally to see more";
            } else {
                element.classList.remove('scrollable');
                element.title = "";
            }
        });
    }, 0);
}