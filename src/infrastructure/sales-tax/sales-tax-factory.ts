import { ISalesTaxFactory } from "../../domain/sales-tax/i-sales-tax-factory";
import { ContractDate } from "../../domain/contract/contract-date";
import { TargetItemCandidate } from "../../domain/sales-tax/target-item/target-item-candidate";
import { SalesTax } from "../../domain/sales-tax/sales-tax";

export class SalesTaxFactory implements ISalesTaxFactory {

    public create(date: ContractDate, candidate: TargetItemCandidate): SalesTax {

        // 実際に使用するDB(ないしファイルなど)からデータを取得して、
        // ドメインオブジェクトに変換、SalesTaxを組み立てる処理を記述する
        return SalesTax.of(rule, date, candidate);
    }

}
