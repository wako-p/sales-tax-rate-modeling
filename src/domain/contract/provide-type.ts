import { IllegalArgumentError } from "../../shared/error/illegal-argument.error";

/**
 * 提供区分
 */
export class ProvideType {

    private readonly _value: string;

    public get value(): string {
        return this._value;
    }

    private constructor(value: string) {

        if(!ProvideType.isValid(value))
            throw new IllegalArgumentError(``);

        this._value = value;
    }

    public static isValid(value: string): boolean {
        return `` != value;
    }

    public static of(value: string): ProvideType {
        return new ProvideType(value);
    }

    public equal(other: ProvideType): boolean {
        return this.value == other.value;
    }

}
