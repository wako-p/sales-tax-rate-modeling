import { Specification } from "../../../shared/support/specification";

/**
 * 対象なんでもおｋ
 */
export class TargetAny<T> extends Specification<T> {

    public static of<T>(): TargetAny<T> {
        return new TargetAny<T>();
    }

    public isSatisfiedBy(t: T): boolean {
        return true;
    }

}
