export function parseHexToBigInt(hex: string): bigint {
    if (!/^0[xX][0-9a-fA-F]+$/.test(hex)) {
        throw new Error("Invalid hex format");
    }
    return BigInt(hex);
}

export function parseDecimalToBigInt(decimal: string): bigint {
    if (!/^-?\d+$/.test(decimal)) {
        throw new Error("Invalid decimal format");
    }
    return BigInt(decimal);
}

export function formatBigIntToHex(bigInt: bigint): string {
    if (bigInt >= 0n) {
        return `0x${bigInt.toString(16).toUpperCase()}`;
    } else {
        // For negative numbers, compute proper two's complement representation
        // We need to mask to our bit width to get proper representation
        const twoComplement = ((~(-bigInt)) & MAX_UINT) + 1n;
        // Ensure we have full width representation
        const hexStr = twoComplement.toString(16).toUpperCase();
        const paddedHex = hexStr.padStart(Number(BIT_WIDTH) / 4, 'F');
        return `0x${paddedHex}`;
    }
}

export function formatBigIntToDecimal(bigInt: bigint): string {
    return bigInt.toString(10);
}

// Define the bit width for our operations (e.g., 256-bit)
const BIT_WIDTH = 256n;
const MAX_UINT = (1n << BIT_WIDTH) - 1n;

/**
 * Switches sign of a bigint value using two's complement within a fixed bit width
 */
export function switchSign(value: bigint): bigint {
    if (value < 0n) {
        // If negative, convert to positive
        return -value;
    } else if (value === 0n) {
        // Zero stays zero
        return 0n;
    } else {
        console.log(`z`)
        // If positive, convert to two's complement negative
        return (MAX_UINT ^ value) + 1n;
    }
}

// Add this new function to interpret hex as two's complement
export function interpretHexAsTwosComplement(hexString: string): bigint {
    // Remove 0x prefix if present
    const cleanHex = hexString.replace(/^0x/i, '');
    
    // Convert to BigInt
    const value = BigInt(`0x${cleanHex}`);
    
    // Check if the most significant bit is set (negative in two's complement)
    if (cleanHex.length > 0 && /^[89a-fA-F]/.test(cleanHex[0])) {
        // Calculate the two's complement negative value
        // This requires calculating based on the bit width of the input
        const bitWidth = BigInt(cleanHex.length * 4); // Each hex digit is 4 bits
        const mask = (1n << bitWidth) - 1n;
        
        // Negative value in two's complement = -(~value + 1)
        return -((~value & mask) + 1n);
    }
    
    // If MSB is not set, it's a positive number
    return value;
}