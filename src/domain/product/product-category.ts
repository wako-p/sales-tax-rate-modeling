import { IllegalArgumentError } from "../../shared/error/illegal-argument.error";

/**
 * 商品カテゴリ
 */
export class ProductCategory {

    private readonly _value: string;

    public get value(): string {
        return this._value;
    }

    private constructor(value: string) {

        if(!ProductCategory.isValid(value))
            throw new IllegalArgumentError(``);

        this._value = value;
    }

    public static isValid(value: string): boolean {
        return `` != value;
    }

    public static of(value: string): ProductCategory {
        return new ProductCategory(value);
    }

    public equal(other: ProductCategory): boolean {
        return this.value == other.value;
    }

}
