import { CompositeSpecification } from "../../../shared/support/composite-specification";
import { TargetItemCandidate } from "./target-item-candidate";

/**
 * 対象品目
 */
export class TargetItem extends CompositeSpecification<TargetItemCandidate> {

    private constructor(
        private readonly spec: CompositeSpecification<TargetItemCandidate>) {
            super();
    }

    public static of(spec: CompositeSpecification<TargetItemCandidate>): TargetItem {
        return new TargetItem(spec);
    }

    public isSatisfiedBy(item: TargetItemCandidate): boolean {
        const result = this.spec.isSatisfiedBy(item);
        return result;
    }

}
