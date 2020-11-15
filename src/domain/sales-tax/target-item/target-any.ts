import { CompositeSpecification } from "../../../shared/support/composite-specification";
import { TargetItemCandidate } from "./target-item-candidate";

/**
 * 対象なんでもおｋ
 */
export class TargetAny
    extends CompositeSpecification<TargetItemCandidate> {

    public static of(): TargetAny {
        return new TargetAny();
    }

    public isSatisfiedBy(candidate: TargetItemCandidate): boolean {
        return true;
    }

}
