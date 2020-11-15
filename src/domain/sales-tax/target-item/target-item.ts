import { CompositeSpecification, ICompositeSpecification } from "../../../shared/support/composite-specification";
import { TargetItemCandidate } from "./target-item-candidate";

/**
 * 対象品目
 */
export class TargetItem extends CompositeSpecification<TargetItemCandidate> {

    private constructor(
        private readonly spec: ICompositeSpecification<TargetItemCandidate>) {
            super();
    }

    public static of(spec: ICompositeSpecification<TargetItemCandidate>): TargetItem {
        return new TargetItem(spec);
    }

    public isSatisfiedBy(item: TargetItemCandidate): boolean {
        const result = this.spec.isSatisfiedBy(item);
        return result;
    }

}
