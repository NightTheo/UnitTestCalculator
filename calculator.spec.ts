import {Calculator} from "./calculator";

describe('calculator', () => {
    it('should add two numbers', () => {
        const calculator: Calculator = new Calculator();
        expect(calculator.add(2,3)).toEqual(5);
    });
});