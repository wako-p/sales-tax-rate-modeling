import { Specification } from "../../../shared/support/specification";
import { TargetItemCandidate } from "./target-item-candidate";

/**
 * 対象なんでもおｋ
 */
export class TargetAny
    extends Specification<TargetItemCandidate> {

    public static of(): TargetAny {
        return new TargetAny();
    }

    public isSatisfiedBy(candidate: TargetItemCandidate): boolean {
        return true;
    }

}
