import goToItemState from "components/Carousel/state/goToItem";
import { CarouselState, Action } from "components/Carousel/logic/types";

export default (state: CarouselState, { itemIndex }: Action): CarouselState =>
  itemIndex === undefined || itemIndex === state.currentItem
    ? { ...state }
    : goToItemState(state, {
        transitionForward: itemIndex > state.currentItem,
        currentItem: itemIndex,
      });
