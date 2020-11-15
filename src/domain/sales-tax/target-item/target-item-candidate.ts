import { ContractType } from "../../contract/contract-type";
import { ProductCategory } from "../../product/product-category";
import { ProvideType } from "../../contract/provide-type";

/**
 * 対象品目候補
 */
export class TargetItemCandidate {

    public get contract(): ContractType {
        return this._contract;
    }

    public get category(): ProductCategory {
        return this._category;
    }

    public get provide(): ProvideType {
        return this._provide;
    }

    private constructor(
        private readonly _contract: ContractType,
        private readonly _category: ProductCategory,
        private readonly _provide:  ProvideType) {
    }

    public static of(contract: string, category: string, provide: string): TargetItemCandidate {
        return new TargetItemCandidate(ContractType.of(contract), ProductCategory.of(category), ProvideType.of(provide));
    }

}
