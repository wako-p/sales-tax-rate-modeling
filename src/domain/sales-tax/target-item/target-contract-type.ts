import { Specification } from "../../../shared/support/specification";
import { ContractType } from "../../contract/contract-type";

/**
 * 対象契約区分
 */
export class TargetContractType extends Specification<ContractType> {

    private constructor(private readonly contract: ContractType) {
        super();
    }

    public static of(contract: string): TargetContractType {
        return new TargetContractType(ContractType.of(contract));
    }

    public isSatisfiedBy(contract: ContractType): boolean {
        const result = this.contract.equal(contract);
        return result;
    }

}
