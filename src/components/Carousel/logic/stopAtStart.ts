export default ({
  infinite,
  currentItem,
}: {
  infinite: boolean;
  currentItem: number;
}): boolean => !infinite && currentItem === 0;
