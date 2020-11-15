import { ISalesTaxFactory } from "../../domain/sales-tax/i-sales-tax-factory";
import { ContractDate } from "../../domain/contract/contract-date";
import { TargetItemCandidate } from "../../domain/sales-tax/target-item/target-item-candidate";
import { ReducedTaxRateApplyConditions } from "../../domain/sales-tax/reduced-tax/reduced-tax-rate-apply-conditions";
import { ReducedTax } from "../../domain/sales-tax/reduced-tax/reduced-tax";
import { StandardTaxRateApplyConditions } from "../../domain/sales-tax/standard-tax/standard-tax-rate-apply-conditions";
import { StandardTax } from "../../domain/sales-tax/standard-tax/standard-tax";
import { SalesTaxRateApplyRule } from "../../domain/sales-tax/sales-tax-rate-apply-rule";
import { EnforcementDate } from "../../domain/sales-tax/enforcement-date";
import { TargetItem } from "../../domain/sales-tax/target-item/target-item";
import { TargetAny } from "../../domain/sales-tax/target-item/target-any";
import { TargetContractType } from "../../domain/sales-tax/target-item/target-contract-type";
import { TargetProductCategory } from "../../domain/sales-tax/target-item/target-product-category";
import { TargetProvideType } from "../../domain/sales-tax/target-item/target-provide-type";
import { SalesTaxRate } from "../../domain/sales-tax/sales-tax-rate";
import { SalesTax } from "../../domain/sales-tax/sales-tax";

export class MockSalesTaxFactory implements ISalesTaxFactory {

    public create(date: ContractDate, candidate: TargetItemCandidate): SalesTax {

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

        return SalesTax.of(rule, date, candidate);
    }

}
