
export interface ICompositeSpecification<T> {
    isSatisfiedBy(candidate: T): boolean;
}

export abstract class CompositeSpecification<T> implements ICompositeSpecification<T> {

    public abstract isSatisfiedBy(candidate: T): boolean;

    public and(spec: ICompositeSpecification<T>): AndSpecification<T> {
        return new AndSpecification(this, spec);
    }

    public or(spec: ICompositeSpecification<T>): OrSpecification<T> {
        return new OrSpecification(this, spec);
    }

    public not(): NotSpecification<T> {
        return new NotSpecification(this);
    }

}

class AndSpecification<T> extends CompositeSpecification<T> {

    public constructor(
        private readonly spec1: ICompositeSpecification<T>,
        private readonly spec2: ICompositeSpecification<T>) {
            super();
    }

    public isSatisfiedBy(candidate: T): boolean {

        const result1 = this.spec1.isSatisfiedBy(candidate);
        const result2 = this.spec2.isSatisfiedBy(candidate);

        return result1 && result2;
    }

}

class OrSpecification<T> extends CompositeSpecification<T> {

    public constructor(
        private readonly spec1: ICompositeSpecification<T>,
        private readonly spec2: ICompositeSpecification<T>) {
            super();
    }

    public isSatisfiedBy(candidate: T): boolean {

        const result1 = this.spec1.isSatisfiedBy(candidate);
        const result2 = this.spec2.isSatisfiedBy(candidate);

        return result1 || result2;
    }

}

class NotSpecification<T> extends CompositeSpecification<T> {

    public constructor(
        private readonly spec: ICompositeSpecification<T>) {
            super();
    }

    public isSatisfiedBy(candidate: T): boolean {
        const result = this.spec.isSatisfiedBy(candidate);
        return !result;
    }

}
