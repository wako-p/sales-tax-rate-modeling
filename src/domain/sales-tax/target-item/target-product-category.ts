import { Specification } from "../../../shared/support/specification";
import { ProductCategory } from "../../product/product-category";

/**
 * 対象商品カテゴリ
 */
export class TargetProductCategory extends Specification<ProductCategory> {

    private constructor(private readonly category: ProductCategory) {
        super();
    }

    public static of(category: string): TargetProductCategory {
        return new TargetProductCategory(ProductCategory.of(category));
    }

    public isSatisfiedBy(category: ProductCategory): boolean {
        const result = this.category.equal(category);
        return result;
    }

}
