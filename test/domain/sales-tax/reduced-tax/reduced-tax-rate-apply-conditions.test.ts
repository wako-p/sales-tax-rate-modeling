import { ReducedTaxRateApplyConditions } from "../../../../src/domain/sales-tax/reduced-tax/reduced-tax-rate-apply-conditions";
import { ReducedTax } from "../../../../src/domain/sales-tax/reduced-tax/reduced-tax";
import { EnforcementDate } from "../../../../src/domain/sales-tax/enforcement-date";
import { TargetItem } from "../../../../src/domain/sales-tax/target-item/target-item";
import { TargetContractType } from "../../../../src/domain/sales-tax/target-item/target-contract-type";
import { TargetProductCategory } from "../../../../src/domain/sales-tax/target-item/target-product-category";
import { TargetProvideType } from "../../../../src/domain/sales-tax/target-item/target-provide-type";
import { SalesTaxRate } from "../../../../src/domain/sales-tax/sales-tax-rate";
import { ContractDate } from "../../../../src/domain/contract/contract-date";
import { TargetItemCandidate } from "../../../../src/domain/sales-tax/target-item/target-item-candidate";

describe(`${ReducedTaxRateApplyConditions.name}`, () => {

    const conditions = new ReducedTaxRateApplyConditions([
        ReducedTax.of(
            EnforcementDate.of(2019, 10, 1),
            TargetItem.of(
                TargetContractType.of(`不定期`)
                    .and(TargetProductCategory.of(`飲食料品`))
                    .and(TargetProvideType.of(`譲渡`).or(TargetProvideType.of(`宅配`))).or(
                TargetContractType.of(`定期`)
                    .and(TargetProductCategory.of(`新聞`))
                    .and(TargetProvideType.of(`宅配`)))
            ),
            SalesTaxRate.of(0.08)
        )
    ]);

    describe(`apply()`, () => {
        test.each([
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`不定期`, `飲食料品`, `宅配`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`不定期`, `飲食料品`, `宅配`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`定期`  , `新聞`    , `宅配`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`定期`  , `新聞`    , `宅配`), SalesTaxRate.of(0.08) ],
        ])(`契約日と対象品目候補に該当する軽減税率を返す`, (date, candidate, expected) => {
            const rate = conditions.apply(date, candidate);
            expect(rate).toEqual(expected);
        });
        test.each([
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `外食`), undefined ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`定期`  , `飲食料品`  , `譲渡`), undefined ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`定期`  , `飲食料品`  , `宅配`), undefined ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`定期`  , `飲食料品`  , `外食`), undefined ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`不定期`, `アルコール`, `譲渡`), undefined ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`不定期`, `アルコール`, `宅配`), undefined ],
            [ ContractDate.of(2019, 10, 2), TargetItemCandidate.of(`不定期`, `アルコール`, `外食`), undefined ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`不定期`, `新聞`      , `宅配`), undefined ],
            [ ContractDate.of(2019, 10, 1), TargetItemCandidate.of(`不定期`, `新聞`      , `譲渡`), undefined ],
        ])(`契約日と対象品目候補に該当する軽減税率がない場合は、undefinedを返す`, (date, candidate, expected) => {
            const rate = conditions.apply(date, candidate);
            expect(rate).toEqual(expected);
        });
    });
});
