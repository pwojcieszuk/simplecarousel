import { CarouselState } from "components/Carousel/logic/types";
export default ({
  itemsLength,
  step,
  infinite,
}: {
  itemsLength: number;
  step: number;
  infinite: boolean;
}): CarouselState => ({
  currentItem: 0,
  inProp: false,
  transitionForward: true,
  itemsLength,
  step,
  infinite,
  touchPosition: null,
  touchMove: null,
});
