import { SalesTaxRate } from "../../../src/domain/sales-tax/sales-tax-rate";
import { IllegalArgumentError } from "../../../src/shared/error/illegal-argument.error";

describe(`${SalesTaxRate.name}`, () => {
    describe(`of()`, () => {
        test.each([
            [ 0.00, 0.00 ],
            [ 0.03, 0.03 ],
            [ 0.05, 0.05 ],
            [ 0.08, 0.08 ],
            [ 0.10, 0.10 ],
        ])(`0以上の数値を渡すとSalesTaxRateが生成できる`, (value, expected) => {
            const rate = SalesTaxRate.of(value);
            expect(rate.value).toBe(expected);
        });
        test.each([
            [   -1, ],
            [  -64, ],
            [ -128, ],
        ])(`0未満の数値を渡すと例外がスローされる`, (value) => {
            expect(() => {
                SalesTaxRate.of(value);
            }).toThrowError(IllegalArgumentError);
        });
    });
});


