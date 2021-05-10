export default ({
  infinite,
  currentItem,
  step,
  itemsLength,
}: {
  infinite: boolean;
  currentItem: number;
  step: number;
  itemsLength: number;
}): boolean => !infinite && currentItem + step >= itemsLength;
