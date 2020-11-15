import { EnforcementDate } from "../enforcement-date";
import { SalesTaxRate } from "../sales-tax-rate";
import { TargetItem } from "../target-item/target-item";

/**
 * 標準税
 */
export class StandardTax {

    public get date(): EnforcementDate {
        return this._date;
    }

    public get item(): TargetItem {
        return this._item;
    }

    public get rate(): SalesTaxRate {
        return this._rate;
    }

    private constructor(
        private readonly _date: EnforcementDate,
        private readonly _item: TargetItem,
        private readonly _rate: SalesTaxRate) {
    }

    public static of(date: EnforcementDate, item: TargetItem, rate: SalesTaxRate): StandardTax {
        return new StandardTax(date, item, rate);
    }

}