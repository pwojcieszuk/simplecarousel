export default (
  currentItem: number,
  step: number,
  itemsLength: number
): number =>
  currentItem - step >= 0
    ? currentItem - step
    : itemsLength + (currentItem - step);
