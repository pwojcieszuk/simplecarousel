import stopAtStart from "components/Carousel/logic/stopAtStart";
import stopAtEnd from "components/Carousel/logic/stopAtEnd";

import { CarouselState } from "components/Carousel/logic/types";

export default ({
  transitionForward: prevTransitionForward,
  infinite,
  currentItem,
  step,
  itemsLength,
}: CarouselState): boolean => {
  if (
    prevTransitionForward &&
    stopAtEnd({ infinite, currentItem, step, itemsLength })
  )
    return false;
  if (!prevTransitionForward && stopAtStart({ infinite, currentItem }))
    return true;
  return prevTransitionForward;
};
