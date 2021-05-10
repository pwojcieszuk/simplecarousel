import goToItemState from "components/Carousel/state/goToItem";
import stopAtEnd from "components/Carousel/logic/stopAtEnd";
import { CarouselState } from "components/Carousel/logic/types";

export default (state: CarouselState): CarouselState =>
  stopAtEnd(state)
    ? { ...state }
    : goToItemState(state, { transitionForward: true });
