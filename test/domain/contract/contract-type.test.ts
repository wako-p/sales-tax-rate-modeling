import { ContractType } from "../../../src/domain/contract/contract-type";
import { IllegalArgumentError } from "../../../src/shared/error/illegal-argument.error";

describe(`${ContractType.name}`, () => {
    describe(`of()`, () => {
        test(`契約区分を渡すとContractTypeを生成できる`, () => {
            const contract = ContractType.of(`譲渡`);
            expect(contract.value).toBe(`譲渡`);
        });
        test(`空白文字を渡すと例外がスローされる`, () => {
            expect(() => {
                ContractType.of(``);
            }).toThrowError(IllegalArgumentError);
        });
    });
    describe(`equal()`, () => {
        test(`契約区分が一致する場合、trueを返す`, () => {
            const provideType = ContractType.of(`譲渡`);
            expect(provideType.equal(ContractType.of(`譲渡`))).toBeTruthy();
        });
        test(`契約区分が一致しない場合、falseを返す`, () => {

            const contract = ContractType.of(`譲渡`);

            expect(contract.equal(ContractType.of(`外食`))).toBeFalsy();
            expect(contract.equal(ContractType.of(`宅配`))).toBeFalsy();
        });
    });
});

