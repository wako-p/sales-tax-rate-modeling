import { Specification } from "../../../shared/support/specification";
import { TargetItemCandidate } from "./target-item-candidate";
import { ContractType } from "../../contract/contract-type";
import { ProductCategory } from "../../product/product-category";
import { ProvideType } from "../../contract/provide-type";

/**
 * 対象品目
 */
export class TargetItem extends Specification<TargetItemCandidate> {

    private constructor(
        private readonly contract: Specification<ContractType>,
        private readonly category: Specification<ProductCategory>,
        private readonly provide:  Specification<ProvideType>) {
            super();
    }

    public static of(
        contract: Specification<ContractType>,
        category: Specification<ProductCategory>,
        provide:  Specification<ProvideType>): TargetItem {
            return new TargetItem(contract, category, provide);
    }

    public isSatisfiedBy(item: TargetItemCandidate): boolean {

        const contractResult = this.contract.isSatisfiedBy(item.contract);
        const categoryResult = this.category.isSatisfiedBy(item.category);
        const provideResult  = this.provide.isSatisfiedBy(item.provide);

        return (contractResult && categoryResult && provideResult);
    }

}
