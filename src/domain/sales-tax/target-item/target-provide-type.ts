import { Specification } from "../../../shared/support/specification";
import { ProvideType } from "../../contract/provide-type";

/**
 * 対象提供区分
 */
export class TargetProvideType extends Specification<ProvideType> {

    private constructor(private readonly provide: ProvideType) {
        super();
    }

    public static of(provide: string): TargetProvideType {
        return new TargetProvideType(ProvideType.of(provide));
    }

    public isSatisfiedBy(provide: ProvideType): boolean {
        const result = this.provide.equal(provide);
        return result;
    }

}
