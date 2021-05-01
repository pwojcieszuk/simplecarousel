import getNItemsFromIndex from "components/Carousel/logic/getNItemsFromIndex";

export default (
  items: unknown[],
  currentItem: number,
  step: number,
  transitionForward: boolean | undefined
): unknown[] => {
  const startItem = transitionForward ? currentItem - step : currentItem;
  const index = startItem < 0 ? items.length + startItem : startItem;
  return [...getNItemsFromIndex(items, index, step * 2)];
};
