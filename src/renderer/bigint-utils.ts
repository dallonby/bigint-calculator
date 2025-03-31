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
    return `0x${bigInt.toString(16).toUpperCase()}`;
}

export function formatBigIntToDecimal(bigInt: bigint): string {
    return bigInt.toString(10);
}

export function switchSign(bigInt: bigint): bigint {
    return -bigInt;
}