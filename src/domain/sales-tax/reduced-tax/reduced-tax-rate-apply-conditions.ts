import { ReducedTax } from "./reduced-tax";
import { ContractDate } from "../../contract/contract-date";
import { TargetItemCandidate } from "../target-item/target-item-candidate";
import { SalesTaxRate } from "../sales-tax-rate";

/**
 * 軽減税率適用条件
 */
export class ReducedTaxRateApplyConditions {

    private readonly taxes: ReducedTax[];

    public constructor(taxes: ReducedTax[]) {
        this.taxes = taxes;
    }

    public add(tax: ReducedTax): ReducedTaxRateApplyConditions {
        const newTaxes = this.taxes.concat(tax);
        return new ReducedTaxRateApplyConditions(newTaxes);
    }

    public apply(date: ContractDate, candidate: TargetItemCandidate): SalesTaxRate | undefined {

        // 施行日をキーに降順に並び替え
        const sortedTaxes = this.taxes.sort((current, next) => {
            if(current.date.greaterThan(next.date)) return -1;
            if(current.date.smallerThan(next.date)) return  1;
            return 0;
        });

        // 契約日以前に施行された最新の軽減税を探す
        const tax = sortedTaxes.find((tax) => {
            // 例) 契約日が2018/04/02の場合
            // 施行日        契約日
            // 2019/10/01 <= 2018/04/02 → 該当しない
            const result = tax.date.lessThan(date);
            return result;
        });

        // 該当する軽減税がない場合は、undefinedを返す
        if(tax == null) return undefined;

        // 該当する軽減税の対象品目に対象品目候補が一致しない場合は、undefinedを返す
        if(!tax.item.isSatisfiedBy(candidate)) return undefined;

        return tax.rate;
    }

}
