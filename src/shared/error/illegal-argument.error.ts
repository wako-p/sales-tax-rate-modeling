import { ApplicationError } from "./application.error";

export class IllegalArgumentError extends ApplicationError {
    constructor(message?: string) { super(message); }
}
