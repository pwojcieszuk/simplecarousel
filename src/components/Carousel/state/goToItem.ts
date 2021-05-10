import calculateNextItem from "components/Carousel/logic/calculateNextItem";
import calculatePrevItem from "components/Carousel/logic/calculatePrevItem";

import {
  CarouselState,
  TransitionOptions,
} from "components/Carousel/logic/types";

export default (
  {
    currentItem: stateCurrentItem,
    step,
    itemsLength,
    ...remainingState
  }: CarouselState,
  { transitionForward, currentItem }: TransitionOptions
): CarouselState => ({
  ...remainingState,
  step,
  itemsLength,
  inProp: true,
  transitionForward,
  currentItem:
    currentItem ||
    (() => (transitionForward ? calculateNextItem : calculatePrevItem))()(
      stateCurrentItem,
      step,
      itemsLength
    ),
});
