import { ContractDate } from "../contract/contract-date";
import { TargetItemCandidate } from "./target-item/target-item-candidate";
import { SalesTax } from "./sales-tax";

export interface ISalesTaxFactory {
    create(date: ContractDate, candidate: TargetItemCandidate): SalesTax;
}
