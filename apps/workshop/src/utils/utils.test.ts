import { doubleTheNum } from './index';

describe('doubleTheNum', () => {
  test('should return double the number', () => {
    expect(doubleTheNum(2)).toBe(4);
  });

  test('should return triple the number', () => {
    expect(doubleTheNum(3)).toBe(6);
  });

  test('should return zero', () => {
    expect(doubleTheNum(0)).toBe(0);
  });

  test('should return a negative number', () => {
    expect(doubleTheNum(-2)).toBe(-4);
  });

  test('should return a decimal number', () => {
    expect(doubleTheNum(0.5)).toBe(1);
  });
});
