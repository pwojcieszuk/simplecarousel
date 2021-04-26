export default (
  items: unknown[],
  currentItem: number,
  step: number
): unknown[] => [
  ...items.slice(currentItem, currentItem + step),
  ...(currentItem + step > items.length - 1
    ? items.slice(0, currentItem - items.length + step)
    : []),
];
