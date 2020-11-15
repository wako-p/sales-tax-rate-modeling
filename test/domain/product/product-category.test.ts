import { ProductCategory } from "../../../src/domain/product/product-category";
import { IllegalArgumentError } from "../../../src/shared/error/illegal-argument.error";

describe(`${ProductCategory.name}`, () => {
    describe(`of()`, () => {
        test(`商品カテゴリを渡すとProductCategoryを生成できる`, () => {
            const category = ProductCategory.of(`飲食料品`);
            expect(category.value).toBe(`飲食料品`);
        });
        test(`空白文字を渡すと例外がスローされる`, () => {
            expect(() => {
                ProductCategory.of(``);
            }).toThrowError(IllegalArgumentError);
        });
    });
    describe(`equal()`, () => {
        test(`商品カテゴリが一致する場合、trueを返す`, () => {
            const category = ProductCategory.of(`飲食料品`);
            expect(category.equal(ProductCategory.of(`飲食料品`))).toBeTruthy();
        });
        test(`商品カテゴリが一致しない場合、falseを返す`, () => {
            const category = ProductCategory.of(`飲食料品`);
            expect(category.equal(ProductCategory.of(`アルコール`))).toBeFalsy();
        });
    });
});
