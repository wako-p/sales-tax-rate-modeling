import { StandardTaxRateApplyConditions } from "../../../../src/domain/sales-tax/standard-tax/standard-tax-rate-apply-conditions";
import { StandardTax } from "../../../../src/domain/sales-tax/standard-tax/standard-tax";
import { EnforcementDate } from "../../../../src/domain/sales-tax/enforcement-date";
import { TargetItem } from "../../../../src/domain/sales-tax/target-item/target-item";
import { TargetAny } from "../../../../src/domain/sales-tax/target-item/target-any";
import { TargetContractType } from "../../../../src/domain/sales-tax/target-item/target-contract-type";
import { TargetProductCategory } from "../../../../src/domain/sales-tax/target-item/target-product-category";
import { TargetProvideType } from "../../../../src/domain/sales-tax/target-item/target-provide-type";
import { SalesTaxRate } from "../../../../src/domain/sales-tax/sales-tax-rate";
import { ContractDate } from "../../../../src/domain/contract/contract-date";
import { TargetItemCandidate } from "../../../../src/domain/sales-tax/target-item/target-item-candidate";

describe(`${StandardTaxRateApplyConditions.name}`, () => {

    const conditions = new StandardTaxRateApplyConditions([
        StandardTax.of(
            EnforcementDate.of(1989,  4, 1),
            TargetItem.of(
                TargetAny.of()
            ),
            SalesTaxRate.of(0.03)
        ),
        StandardTax.of(
            EnforcementDate.of(1997,  4, 1),
            TargetItem.of(
                TargetAny.of()
            ),
            SalesTaxRate.of(0.05)
        ),
        StandardTax.of(
            EnforcementDate.of(2014,  4, 1),
            TargetItem.of(
                TargetAny.of()
            ),
            SalesTaxRate.of(0.08)
        ),
        StandardTax.of(
            EnforcementDate.of(2019, 10, 1),
            TargetItem.of(
                TargetContractType.of(`不定期`)
                    .and(TargetProductCategory.of(`飲食料品`))
                    .and(TargetProvideType.of(`譲渡`).or(TargetProvideType.of(`宅配`)))
                .or(
                TargetContractType.of(`定期`)
                    .and(TargetProductCategory.of(`新聞`))
                    .and(TargetProvideType.of(`宅配`)))
                .not()
            ),
            SalesTaxRate.of(0.10)
        )
    ]);

    describe(`apply()`, () => {
        test.each([
            // 1989/04/01 - 1997/03/31 → 0.03
            [ ContractDate.of(1989,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1989,  4,  2), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1989,  8, 12), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1990, 10, 10), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1997,  3, 31), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.03) ],
            // 1997/04/01 - 2014/03/31 → 0.05
            [ ContractDate.of(1997,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(1997,  4,  2), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(1997,  8, 12), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(2000, 10, 10), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(2014,  3, 31), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.05) ],
            // 2014/04/01 - 2014/09/30 → 0.08
            [ ContractDate.of(2014,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2014,  4,  2), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2014,  8, 12), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2016, 10, 10), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019,  9, 30), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.08) ],
            // 2019/10/01 - yyyy/mm/dd → 0.10
            [ ContractDate.of(2019, 10,  1), TargetItemCandidate.of(`不定期`, `飲食料品`, `外食`), SalesTaxRate.of(0.10) ],
            [ ContractDate.of(2019, 10,  2), TargetItemCandidate.of(`不定期`, `飲食料品`, `外食`), SalesTaxRate.of(0.10) ],
            [ ContractDate.of(2020, 11,  7), TargetItemCandidate.of(`不定期`, `飲食料品`, `外食`), SalesTaxRate.of(0.10) ],
        ])(`契約日と対象品目候補に該当する標準税率を返す`, (date, candidate, expected) => {
            const rate = conditions.apply(date, candidate);
            expect(rate).toEqual(expected);
        });
        test.each([
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), undefined ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), undefined ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`不定期`, `飲食料品`, `宅配`), undefined ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`不定期`, `飲食料品`, `宅配`), undefined ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`定期`  , `新聞`    , `宅配`), undefined ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`定期`  , `新聞`    , `宅配`), undefined ],
        ])(`契約日と対象品目候補に該当する標準税率がない場合は、undefinedを返す`, (date, candidate, expected) => {
            const rate = conditions.apply(date, candidate);
            expect(rate).toEqual(expected);
        });
    });
});
