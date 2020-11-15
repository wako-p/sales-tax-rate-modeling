import { IllegalArgumentError } from "../../shared/error/illegal-argument.error";

/**
 * 契約区分
 */
export class ContractType {

    private readonly _value: string;

    public get value(): string {
        return this._value;
    }

    private constructor(value: string) {

        if(!ContractType.isValid(value))
            throw new IllegalArgumentError(``);

        this._value = value;
    }

    public static isValid(value: string): boolean {
        return `` != value;
    }

    public static of(value: string): ContractType {
        return new ContractType(value);
    }

    public equal(other: ContractType): boolean {
        return this.value == other.value;
    }

}
