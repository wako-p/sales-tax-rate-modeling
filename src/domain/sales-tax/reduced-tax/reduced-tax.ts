import { EnforcementDate } from "../enforcement-date";
import { Specification } from "../../../shared/support/specification";
import { TargetItemCandidate } from "../target-item/target-item-candidate";
import { SalesTaxRate } from "../sales-tax-rate";

/**
 * 軽減税
 */
export class ReducedTax {

    public get date(): EnforcementDate {
        return this._date;
    }

    public get item(): Specification<TargetItemCandidate> {
        return this._item;
    }

    public get rate(): SalesTaxRate {
        return this._rate;
    }

    private constructor(
        private readonly _date: EnforcementDate,
        private readonly _item: Specification<TargetItemCandidate>,
        private readonly _rate: SalesTaxRate) {
    }

    public static of(
        date: EnforcementDate,
        item: Specification<TargetItemCandidate>,
        rate: SalesTaxRate): ReducedTax {
            return new ReducedTax(date, item, rate);
    }

}
