import { ProvideType } from "../../../src/domain/contract/provide-type";
import { IllegalArgumentError } from "../../../src/shared/error/illegal-argument.error";

describe(`${ProvideType.name}`, () => {
    describe(`of()`, () => {
        test(`提供区分を渡すとProvideTypeを生成できる`, () => {
            const provide = ProvideType.of(`譲渡`);
            expect(provide.value).toBe(`譲渡`);
        });
        test(`空白文字を渡すと例外がスローされる`, () => {
            expect(() => {
                ProvideType.of(``);
            }).toThrowError(IllegalArgumentError);
        });
    });
    describe(`equal()`, () => {
        test(`提供区分が一致する場合、trueを返す`, () => {
            const provide = ProvideType.of(`譲渡`);
            expect(provide.equal(ProvideType.of(`譲渡`))).toBeTruthy();
        });
        test(`提供区分が一致しない場合、falseを返す`, () => {

            const provide = ProvideType.of(`譲渡`);

            expect(provide.equal(ProvideType.of(`外食`))).toBeFalsy();
            expect(provide.equal(ProvideType.of(`宅配`))).toBeFalsy();
        });
    });
});

