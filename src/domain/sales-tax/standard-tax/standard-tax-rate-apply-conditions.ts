import { StandardTax } from "./standard-tax";
import { SalesTaxRate } from "../sales-tax-rate";
import { ContractDate } from "../../contract/contract-date";
import { TargetItemCandidate } from "../target-item/target-item-candidate";

/**
 * 標準税率適用条件
 */
export class StandardTaxRateApplyConditions {

    private readonly taxes: StandardTax[];

    public constructor(taxes: StandardTax[]) {
        this.taxes = taxes;
    }

    public add(tax: StandardTax): StandardTaxRateApplyConditions {
        const newTaxes = this.taxes.concat(tax);
        return new StandardTaxRateApplyConditions(newTaxes);
    }

    public apply(date: ContractDate, candidate: TargetItemCandidate): SalesTaxRate | undefined {

        // 施行日をキーに降順に並び替え
        // 例)
        // 1989/04/01 → 2019/10/01
        // 1997/04/01 → 2014/04/01
        // 2014/04/01 → 1997/04/01
        // 2019/10/01 → 1989/04/01
        const sortedTaxes = this.taxes.sort((current, next) => {
            if(current.date.greaterThan(next.date)) return -1;
            if(current.date.smallerThan(next.date)) return  1;
            return 0;
        });

        // 契約日以前に施行された最新の標準税を探す
        const tax = sortedTaxes.find((tax) => {
            // 例) 契約日が2018/04/02の場合
            // 施行日        契約日
            // 2019/10/01 <= 2018/04/02 → 該当しない
            // 2014/04/01 <= 2018/04/02 → 該当する
            // 1997/04/01
            // 1989/04/01
            const result = tax.date.lessThan(date);
            return result;
        });

        // 該当する標準税がない場合は、undefinedを返す
        if(tax == null) return undefined;

        // 該当する標準税の対象品目に対象品目候補が一致しない場合は、undefinedを返す
        if(!tax.item.isSatisfiedBy(candidate)) return undefined;

        return tax.rate;
    }

}
