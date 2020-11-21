
export abstract class Specification<T> implements Specification<T> {

    public abstract isSatisfiedBy(candidate: T): boolean;

    public and(spec: Specification<T>): Specification<T> {
        return new AndSpecification(this, spec);
    }

    public or(spec: Specification<T>): Specification<T> {
        return new OrSpecification(this, spec);
    }

    public not(): Specification<T> {
        return new NotSpecification(this);
    }

}

class AndSpecification<T> extends Specification<T> {

    public constructor(
        private readonly spec1: Specification<T>,
        private readonly spec2: Specification<T>) {
            super();
    }

    public isSatisfiedBy(candidate: T): boolean {

        const result1 = this.spec1.isSatisfiedBy(candidate);
        const result2 = this.spec2.isSatisfiedBy(candidate);

        return result1 && result2;
    }

}

class OrSpecification<T> extends Specification<T> {

    public constructor(
        private readonly spec1: Specification<T>,
        private readonly spec2: Specification<T>) {
            super();
    }

    public isSatisfiedBy(candidate: T): boolean {

        const result1 = this.spec1.isSatisfiedBy(candidate);
        const result2 = this.spec2.isSatisfiedBy(candidate);

        return result1 || result2;
    }

}

class NotSpecification<T> extends Specification<T> {

    public constructor(
        private readonly spec: Specification<T>) {
            super();
    }

    public isSatisfiedBy(candidate: T): boolean {
        const result = this.spec.isSatisfiedBy(candidate);
        return !result;
    }

}
