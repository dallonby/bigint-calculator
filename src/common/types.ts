export type InputType = 'hex' | 'decimal';

export interface BigIntInput {
    value: string;
    type: InputType;
}

export interface CalculationResult {
    result: string;
    type: InputType;
}

export type OperationType = 'add' | 'subtract' | 'multiply' | 'divide';