import { SalesTaxRateApplyRule } from "./sales-tax-rate-apply-rule";
import { ContractDate } from "../contract/contract-date";
import { TargetItemCandidate } from "./target-item/target-item-candidate";
import { SalesTaxRate } from "./sales-tax-rate";

/**
 * 消費税
 */
export class SalesTax {

    private _rate: SalesTaxRate;

    public get rate(): SalesTaxRate {
        return this._rate;
    }

    private constructor(
        rule: SalesTaxRateApplyRule,
        date: ContractDate,
        item: TargetItemCandidate) {
            this._rate = rule.apply(date, item);
    }

    public static of(
        rule: SalesTaxRateApplyRule,
        date: ContractDate,
        item: TargetItemCandidate): SalesTax {
            return new SalesTax(rule, date, item);
    }

}
