import { CompositeSpecification } from "../../../shared/support/composite-specification";
import { TargetItemCandidate } from "./target-item-candidate";
import { ProductCategory } from "../../product/product-category";

/**
 * 対象商品カテゴリ
 */
export class TargetProductCategory
    extends CompositeSpecification<TargetItemCandidate> {

    private constructor(private readonly category: ProductCategory) {
        super();
    }

    public static of(category: string): TargetProductCategory {
        return new TargetProductCategory(ProductCategory.of(category));
    }

    public isSatisfiedBy(candidate: TargetItemCandidate): boolean {
        const result = this.category.equal(candidate.category);
        return result;
    }

}
