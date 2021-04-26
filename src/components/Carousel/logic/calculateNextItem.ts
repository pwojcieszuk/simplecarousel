export default (
  currentItem: number,
  step: number,
  itemsLength: number
): number =>
  currentItem + step < itemsLength
    ? currentItem + step
    : currentItem - itemsLength + step;
