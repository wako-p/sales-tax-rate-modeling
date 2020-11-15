import { CompositeSpecification } from "../../../shared/support/composite-specification";
import { TargetItemCandidate } from "./target-item-candidate";
import { ContractType } from "../../contract/contract-type";

/**
 * 対象契約区分
 */
export class TargetContractType
    extends CompositeSpecification<TargetItemCandidate> {

    private constructor(private readonly contract: ContractType) {
        super();
    }

    public static of(contract: string): TargetContractType {
        return new TargetContractType(ContractType.of(contract));
    }

    public isSatisfiedBy(candidate: TargetItemCandidate): boolean {
        const result = this.contract.equal(candidate.contract);
        return result;
    }

}
