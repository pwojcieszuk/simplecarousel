import goToItemState from "components/Carousel/state/goToItem";
import stopAtStart from "components/Carousel/logic/stopAtStart";
import { CarouselState } from "components/Carousel/logic/types";

export default (state: CarouselState): CarouselState =>
  stopAtStart(state)
    ? { ...state }
    : goToItemState(state, { transitionForward: false });
