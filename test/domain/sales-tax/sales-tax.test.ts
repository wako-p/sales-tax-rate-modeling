import { SalesTax } from "../../../src/domain/sales-tax/sales-tax";
import { SalesTaxRateApplyRule } from "../../../src/domain/sales-tax/sales-tax-rate-apply-rule";
import { ReducedTaxRateApplyConditions } from "../../../src/domain/sales-tax/reduced-tax/reduced-tax-rate-apply-conditions";
import { ReducedTax } from "../../../src/domain/sales-tax/reduced-tax/reduced-tax";
import { StandardTaxRateApplyConditions } from "../../../src/domain/sales-tax/standard-tax/standard-tax-rate-apply-conditions";
import { StandardTax } from "../../../src/domain/sales-tax/standard-tax/standard-tax";
import { EnforcementDate } from "../../../src/domain/sales-tax/enforcement-date";
import { TargetItem } from "../../../src/domain/sales-tax/target-item/target-item";
import { TargetAny } from "../../../src/domain/sales-tax/target-item/target-any";
import { TargetContractType } from "../../../src/domain/sales-tax/target-item/target-contract-type";
import { TargetProductCategory } from "../../../src/domain/sales-tax/target-item/target-product-category";
import { TargetProvideType } from "../../../src/domain/sales-tax/target-item/target-provide-type";
import { SalesTaxRate } from "../../../src/domain/sales-tax/sales-tax-rate";
import { ContractDate } from "../../../src/domain/contract/contract-date";
import { TargetItemCandidate } from "../../../src/domain/sales-tax/target-item/target-item-candidate";

describe(`${SalesTax.name}`, () => {

    // 軽減税率適用条件
    const reducedConditions = new ReducedTaxRateApplyConditions([
        ReducedTax.of(
            EnforcementDate.of(2019, 10, 1),
            // (不定期 && 飲食料品 && (譲渡 || 宅配)) || (定期 && 新聞 && 宅配)
            TargetItem.of(
                // 不定期 && 飲食料品 && (譲渡 || 宅配)
                TargetContractType.of(`不定期`)
                    .and(TargetProductCategory.of(`飲食料品`))
                    .and(TargetProvideType.of(`譲渡`).or(TargetProvideType.of(`宅配`)))
                .or(
                // 定期 && 新聞 && 宅配
                TargetContractType.of(`定期`)
                    .and(TargetProductCategory.of(`新聞`))
                    .and(TargetProvideType.of(`宅配`)))
            ),
            SalesTaxRate.of(0.08)
        )
    ]);

    // 標準税率適用条件
    const standardConditions = new StandardTaxRateApplyConditions([
        StandardTax.of(
            EnforcementDate.of(1989, 4, 1),
            TargetItem.of(
                TargetAny.of()
            ),
            SalesTaxRate.of(0.03)
        ),
        StandardTax.of(
            EnforcementDate.of(1997, 4, 1),
            TargetItem.of(
                TargetAny.of()
            ),
            SalesTaxRate.of(0.05)
        ),
        StandardTax.of(
            EnforcementDate.of(2014, 4, 1),
            TargetItem.of(
                TargetAny.of()
            ),
            SalesTaxRate.of(0.08)
        ),
        StandardTax.of(
            EnforcementDate.of(2019, 10, 1),
            // !((不定期 && 飲食料品 && (譲渡 || 宅配)) || (定期 && 新聞 && 宅配))
            TargetItem.of(
                // 不定期 && 飲食料品 && (譲渡 || 宅配)
                TargetContractType.of(`不定期`)
                    .and(TargetProductCategory.of(`飲食料品`))
                    .and(TargetProvideType.of(`譲渡`).or(TargetProvideType.of(`宅配`)))
                .or(
                // 定期 && 新聞 && 宅配
                TargetContractType.of(`定期`)
                    .and(TargetProductCategory.of(`新聞`))
                    .and(TargetProvideType.of(`宅配`)))
                .not()
            ),
            SalesTaxRate.of(0.10)
        )
    ]);

    // 消費税率適用ルール
    const rule = new SalesTaxRateApplyRule(reducedConditions, standardConditions);

    describe(`of()`, () => {
        test.each([
            // 1989/04/01 - 1997/03/31 → 0.03
            [ ContractDate.of(1989,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `譲渡`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1989,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `宅配`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1989,  4,  1), TargetItemCandidate.of(`定期`  , `新聞`      , `宅配`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1997,  3, 31), TargetItemCandidate.of(`不定期`, `飲食料品`  , `譲渡`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1997,  3, 31), TargetItemCandidate.of(`不定期`, `飲食料品`  , `宅配`), SalesTaxRate.of(0.03) ],
            [ ContractDate.of(1997,  3, 31), TargetItemCandidate.of(`定期`  , `新聞`      , `宅配`), SalesTaxRate.of(0.03) ],
            // 1997/04/01 - 2014/03/31 → 0.05
            [ ContractDate.of(1997,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `譲渡`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(1997,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `宅配`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(1997,  4,  1), TargetItemCandidate.of(`定期`  , `新聞`      , `宅配`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(2014,  3, 31), TargetItemCandidate.of(`不定期`, `飲食料品`  , `譲渡`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(2014,  3, 31), TargetItemCandidate.of(`不定期`, `飲食料品`  , `宅配`), SalesTaxRate.of(0.05) ],
            [ ContractDate.of(2014,  3, 31), TargetItemCandidate.of(`定期`  , `新聞`      , `宅配`), SalesTaxRate.of(0.05) ],
            // 2014/04/01 - 2019/09/30 → 0.08
            [ ContractDate.of(2014,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2014,  4,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `宅配`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2014,  4,  1), TargetItemCandidate.of(`定期`  , `新聞`      , `宅配`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019,  9, 30), TargetItemCandidate.of(`不定期`, `飲食料品`  , `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019,  9, 30), TargetItemCandidate.of(`不定期`, `飲食料品`  , `宅配`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019,  9, 30), TargetItemCandidate.of(`定期`  , `新聞`      , `宅配`), SalesTaxRate.of(0.08) ],
            // 2019/10/01 - yyyy/mm/dd → 0.08
            [ ContractDate.of(2019, 10,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `譲渡`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019, 10,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `宅配`), SalesTaxRate.of(0.08) ],
            [ ContractDate.of(2019, 10,  1), TargetItemCandidate.of(`定期`  , `新聞`      , `宅配`), SalesTaxRate.of(0.08) ],
            // 2019/10/01 - yyyy/mm/dd → 0.10
            [ ContractDate.of(2019, 10,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `外食`), SalesTaxRate.of(0.10) ],
            [ ContractDate.of(2019, 10,  1), TargetItemCandidate.of(`不定期`, `アルコール`, `譲渡`), SalesTaxRate.of(0.10) ],
            // 該当なし → 0.00
            [ ContractDate.of(1970, 10,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `譲渡`), SalesTaxRate.of(0.00) ],
            [ ContractDate.of(1970, 10,  1), TargetItemCandidate.of(`不定期`, `飲食料品`  , `宅配`), SalesTaxRate.of(0.00) ],
            [ ContractDate.of(1970, 10,  1), TargetItemCandidate.of(`不定期`, `新聞`      ,`宅配`), SalesTaxRate.of(0.00) ],
        ])(`契約日と対象品目候補に該当する軽減税率または、標準税率を返す`, (date, candidate, expected) => {
            const tax = SalesTax.of(rule, date, candidate);
            expect(tax.rate).toEqual(expected);
        });
    });
});
