import { CompositeSpecification } from "../../../shared/support/composite-specification";
import { TargetItemCandidate } from "./target-item-candidate";
import { ProvideType } from "../../contract/provide-type";

/**
 * 対象提供区分
 */
export class TargetProvideType
    extends CompositeSpecification<TargetItemCandidate> {

    private constructor(private readonly provide: ProvideType) {
        super();
    }

    public static of(provide: string): TargetProvideType {
        return new TargetProvideType(ProvideType.of(provide));
    }

    public isSatisfiedBy(candidate: TargetItemCandidate): boolean {
        const result = this.provide.equal(candidate.provide);
        return result;
    }

}
