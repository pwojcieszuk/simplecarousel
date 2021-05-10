import goToItemState from "components/Carousel/state/goToItem";
import detectTransitionDirection from "components/Carousel/logic/detectTransitionDirection";

import { CarouselState } from "components/Carousel/logic/types";

export default (state: CarouselState): CarouselState =>
  goToItemState(state, {
    transitionForward: state.infinite || detectTransitionDirection(state),
  });
