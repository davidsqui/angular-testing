import { Calculator } from './calculator';

fdescribe('Test for calculator', () => {
  it('#multiply should return a nine', () => {
    //Arrange
    const calculator = new Calculator();
    //Actions
    const result = calculator.multiply(3, 3);
    //Asserts
    expect(result).toEqual(9);
  });

  it('#multiply should return a four', () => {
    //Arrange
    const calculator = new Calculator();
    //Actions
    const result = calculator.multiply(1, 4);
    //Asserts
    expect(result).toEqual(4);
  });

  it('#divide should return a some numbers', () => {
    //Arrange
    const calculator = new Calculator();
    //Asserts
    expect(calculator.divide(6, 3)).toEqual(2);
    expect(calculator.divide(5, 2)).toEqual(2.5);
  });

  it('#divide for zero', () => {
    //Arrange
    const calculator = new Calculator();
    //Actions
    //Asserts
    expect(calculator.divide(6, 0)).toBeNull();
    expect(calculator.divide(5, 0)).toBeNull();
  });
});
