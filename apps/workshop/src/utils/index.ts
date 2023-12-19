const isPerfectSquare = (num: number): boolean => {
  const s = parseInt(Math.sqrt(num).toString());

  return s * s === num;
};

const isFibonacci = (num: number): boolean => {
  return (
    isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4)
  );
};

export const doubleTheNum = (num: number) => num * 2;

export const funkyNum = (num: number) => {
  if (num % 10 === 0) {
    return Math.floor(num / 2);
  }

  if (isFibonacci(num)) {
    return num * 1;
  }

  return num * num;
};
