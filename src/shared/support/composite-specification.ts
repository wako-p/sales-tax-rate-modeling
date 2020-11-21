
export abstract class CompositeSpecification<T> implements CompositeSpecification<T> {

    public abstract isSatisfiedBy(candidate: T): boolean;

    public and(spec: CompositeSpecification<T>): CompositeSpecification<T> {
        return new AndSpecification(this, spec);
    }

    public or(spec: CompositeSpecification<T>): CompositeSpecification<T> {
        return new OrSpecification(this, spec);
    }

    public not(): CompositeSpecification<T> {
        return new NotSpecification(this);
    }

}

class AndSpecification<T> extends CompositeSpecification<T> {

    public constructor(
        private readonly spec1: CompositeSpecification<T>,
        private readonly spec2: CompositeSpecification<T>) {
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
        private readonly spec1: CompositeSpecification<T>,
        private readonly spec2: CompositeSpecification<T>) {
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
        private readonly spec: CompositeSpecification<T>) {
            super();
    }

    public isSatisfiedBy(candidate: T): boolean {
        const result = this.spec.isSatisfiedBy(candidate);
        return !result;
    }

}
