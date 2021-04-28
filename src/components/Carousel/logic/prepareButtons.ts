export default (step: number, keys: number[]): number[] =>
  step === 1 ? keys : keys.filter((_, i) => i % 3 === 0);
