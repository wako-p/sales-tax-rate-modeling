import { IllegalArgumentError } from "../../shared/error/illegal-argument.error";

/**
 * 契約日
 */
export class ContractDate {

    private readonly _time: number;

    public get time(): number {
        return this._time;
    }

    private constructor(yyyy: number, mm: number, dd: number) {

        if(!ContractDate.isValid(yyyy, mm, dd))
            throw new IllegalArgumentError(``);

        this._time = new Date(yyyy, (mm - 1), dd).getTime();
    }

    private static isValid(yyyy: number, mm: number, dd: number): boolean {

        const date = new Date(yyyy, (mm - 1), dd);

        const y = date.getFullYear();
        if((y < 0) || (y != yyyy)) return false;

        const m = date.getMonth() + 1;
        if(m != mm) return false;

        const d = date.getDate();
        if(d != dd) return false

        return true;
    }

    public static of(yyyy: number, mm: number, dd: number): ContractDate {
        return new ContractDate(yyyy, mm, dd);
    }

}
