import { IllegalArgumentError } from "../../shared/error/illegal-argument.error";

/**
 * 消費税率
 */
export class SalesTaxRate {

    private readonly _value: number;

    public get value(): number {
        return this._value;
    }

    private constructor(value: number) {

        if(!SalesTaxRate.isValid(value))
            throw new IllegalArgumentError();

        this._value = value;
    }

    private static isValid(value: number): boolean {
        return 0.00 <= value;
    }

    public static of(value: number): SalesTaxRate {
        return new SalesTaxRate(value);
    }

}
