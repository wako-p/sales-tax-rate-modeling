import { ContractDate } from "../../../src/domain/contract/contract-date";
import { EnforcementDate } from "../../../src/domain/sales-tax/enforcement-date";
import { IllegalArgumentError } from "../../../src/shared/error/illegal-argument.error";

describe(`${EnforcementDate.name}`, () => {
    describe(`of()`, () => {
        test.each([
            [ 1989,  4, 1, new Date(1989,  (4 - 1), 1).getTime() ],
            [ 1997,  4, 1, new Date(1997,  (4 - 1), 1).getTime() ],
            [ 2014,  4, 1, new Date(2014,  (4 - 1), 1).getTime() ],
            [ 2019, 10, 1, new Date(2019, (10 - 1), 1).getTime() ],
        ])(`年月日を渡すとEnforcementDateが生成できる`, (yyyy, mm, dd, expected) => {
            const date = EnforcementDate.of(yyyy, mm, dd);
            expect(date.time).toBe(expected);
        });
        test.each([
            [   -1,  4,  2 ],
            [ 2018, -1,  2 ],
            [ 2018,  4, -1 ],
            [ 2018,  2, 31 ],
            [ 2018,  4, 31 ],
            [ 2018,  6, 31 ],
            [ 2018,  9, 31 ],
            [ 2018, 11, 31 ],
        ])(`存在しない年月日を渡すと例外がスローされる`, (yyyy, mm , dd) => {
            expect(() => {
                EnforcementDate.of(yyyy, mm, dd);
            }).toThrowError(IllegalArgumentError);
        });
    });
    describe(`smallerThan()`, () => {
        test(`渡されたEnforcementDateより小さい場合、trueを返す`, () => {
            const date = EnforcementDate.of(2014, 4, 1);
            expect(date.smallerThan(EnforcementDate.of(2014, 4, 2))).toBeTruthy();
        });
        test(`渡されたEnforcementDateより小さくない場合、falseを返す`, () => {
            const date = EnforcementDate.of(2014, 4, 1);
            expect(date.smallerThan(EnforcementDate.of(2014, 4,  1))).toBeFalsy();
            expect(date.smallerThan(EnforcementDate.of(2014, 3, 31))).toBeFalsy();
        });
    });
    describe(`greaterThan()`, () => {
        test(`渡されたEnfocementDateより大きい場合、trueを返す`, () => {
            const date = EnforcementDate.of(2014, 4, 1);
            expect(date.greaterThan(EnforcementDate.of(2014, 3, 31))).toBeTruthy();
        });
        test(`渡されたEnfocementDateより大きくない場合、falseを返す`, () => {
            const date = EnforcementDate.of(2014, 4, 1);
            expect(date.greaterThan(EnforcementDate.of(2014, 4, 1))).toBeFalsy();
            expect(date.greaterThan(EnforcementDate.of(2014, 4, 2))).toBeFalsy();
        });
    });
    describe(`lessThan()`, () => {
        test(`渡されたContractDate以下(以降)の場合、trueを返す`, () => {
            const date = EnforcementDate.of(2014, 4, 1);
            expect(date.lessThan(ContractDate.of(2014, 4, 1))).toBeTruthy();
            expect(date.lessThan(ContractDate.of(2014, 4, 2))).toBeTruthy();
        });
        test(`渡されたContractDateより大きい場合、trueを返す`, () => {
            const date = EnforcementDate.of(2014, 4, 1);
            expect(date.lessThan(ContractDate.of(2014, 3, 31))).toBeFalsy();
        });
    });
});
