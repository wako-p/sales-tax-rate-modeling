
export class ApplicationError extends Error {

    constructor(message?: string) {

        super(message);

        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    public toString() {
        return `${ this.name }: ${ this.message }`;
    }

}
