import { ReducedTaxRateApplyConditions } from "./reduced-tax/reduced-tax-rate-apply-conditions";
import { StandardTaxRateApplyConditions } from "./standard-tax/standard-tax-rate-apply-conditions";
import { ContractDate } from "../contract/contract-date";
import { TargetItemCandidate } from "./target-item/target-item-candidate";
import { SalesTaxRate } from "./sales-tax-rate";

/**
 * 消費税率適用ルール
 */
export class SalesTaxRateApplyRule {

    public constructor(
        private readonly reducedConditions:  ReducedTaxRateApplyConditions,
        private readonly standardConditions: StandardTaxRateApplyConditions) {
    }

    public apply(date: ContractDate, item: TargetItemCandidate): SalesTaxRate {

        const reducedTaxRate = this.reducedConditions.apply(date, item);
        if(reducedTaxRate != null) return reducedTaxRate;

        const standardTaxRate = this.standardConditions.apply(date, item);
        if(standardTaxRate != null) return standardTaxRate;

        return SalesTaxRate.of(0.00);
    }

}
