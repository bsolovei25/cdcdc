import { Injectable } from '@angular/core';

@Injectable()
export class EjcoOnpzHelperService {

    constructor() { }

    public compareArrayOfObjects<T>(a: T[], b: T[]): boolean {
        for (const item in a) {
            for (const property in a[item]) {
                if (a[item][property] !== b[item][property]) {
                    return false;
                }
            }
        }
        return true;
    }

    public compareObjects<T>(a: T, b: T): boolean {
        for (const property in a) {
            if (a[property] !== b[property]) {
                return false;
            }
        }
        return true;
    }

    public sortArray<T>(
        arr: T[],
        n: number
    ): T[][] {
        let i = 0;
        let j = 0;
        const result = [];
        let temp = [];
        for (const item of arr) {
            i++;
            j++;
            temp.push(item);
            if (i === n || j === arr.length) {
                result.push(temp);
                temp = [];
                i = 0;
            }
        }
        return result;
    }
}
