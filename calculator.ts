import {DivideByZeroException} from "./divide-by-zero.exception";

export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    sub(a: number, b: number): number {
        return a - b;
    }

    mul(a: number, b: number): number {
        return a * b;
    }

    div(a: number, b: number): number {
        if (b == 0) {
            throw new DivideByZeroException();
        }
        return a / b;
    }

    avg(tab: number[]): number {
        if(tab.length == 0) return 0;
        return tab.reduce((sum: number, cur: number) => sum + cur, 0) / tab.length;
    }
}