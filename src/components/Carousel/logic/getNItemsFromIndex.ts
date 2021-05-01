export default (items: unknown[], index: number, n: number): unknown[] => [
  ...items.slice(index, index + n),
  ...(index + n >= items.length - 1
    ? items.slice(0, index - items.length + n)
    : []),
];
