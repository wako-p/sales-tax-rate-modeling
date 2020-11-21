import { Specification } from "../../../shared/support/specification";
import { TargetItemCandidate } from "./target-item-candidate";

/**
 * 対象品目
 */
export class TargetItem extends Specification<TargetItemCandidate> {

    private constructor(
        private readonly spec: Specification<TargetItemCandidate>) {
            super();
    }

    public static of(spec: Specification<TargetItemCandidate>): TargetItem {
        return new TargetItem(spec);
    }

    public isSatisfiedBy(item: TargetItemCandidate): boolean {
        const result = this.spec.isSatisfiedBy(item);
        return result;
    }

}
