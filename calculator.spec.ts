import {Calculator} from "./calculator/calculator";
import {DivideByZeroException} from "./calculator/divide-by-zero.exception";

describe('calculator', () => {
    const calculator: Calculator = new Calculator();

    it('should add two numbers', () => {
        expect(calculator.add(2,3)).toEqual(5);
    });

    it('should subtract two numbers', () => {
        expect(calculator.sub(2,3)).toEqual(-1);
    });

    it('should multiply two numbers', () => {
        expect(calculator.mul(2,3)).toEqual(6);
    });

    it('should divide two numbers', () => {
        expect(calculator.div(10,5)).toEqual(2);
    });

    it('should throw illegal argument exception', () => {
        expect(() => calculator.div(10,0)).toThrow(
            DivideByZeroException
        );
    });

    it('should compute average of an array of same number', () => {
        expect(calculator.avg([4,4,4])).toEqual(4);
    });

    it('should compute average of an array of different numbers', () => {
        expect(calculator.avg([4,10,12])).toBeCloseTo(8.66, 1);
    });

    it('should get average of 0 if the array is empty', () => {
        expect(calculator.avg([])).toEqual(0);
    });
});