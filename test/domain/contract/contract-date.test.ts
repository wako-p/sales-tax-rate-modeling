import { ContractDate } from "../../../src/domain/contract/contract-date";
import { IllegalArgumentError } from "../../../src/shared/error/illegal-argument.error";

describe(`${ContractDate.name}`, () => {
    describe(`of()`, () => {
        test(`年月日を渡すとContractDateが生成できる`, () => {
            const date = ContractDate.of(2018, 4, 2);
            expect(date.time).toBe(new Date(2018, (4 - 1), 2).getTime());
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
                ContractDate.of(yyyy, mm, dd);
            }).toThrowError(IllegalArgumentError);
        });
    });
});

