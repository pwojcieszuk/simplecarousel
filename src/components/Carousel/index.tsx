import React, { useMemo, useReducer, useEffect, useRef } from "react";
import { Transition, SwitchTransition } from "react-transition-group";
import styles from "components/Carousel/carousel.module.scss";
import {
  defaultStyle,
  transitionStylesForward,
  transitionStylesReverse,
} from "components/Carousel/constants";

import prepareSlides from "components/Carousel/logic/prepareSlides";
import calculateNextItem from "components/Carousel/logic/calculateNextItem";
import calculatePrevItem from "components/Carousel/logic/calculatePrevItem";

import prepareItems from "components/Carousel/utils/prepareItems";

import Controls from "components/Carousel/Controls";

import useSwipe from "hooks/useSwipe";

import {
  Action,
  CarouselProps as Props,
  CarouselState as State,
  CarouselChildren as Children,
  TransitionOptions,
} from "components/Carousel/logic/types";

const initState = ({
  itemsLength,
  step,
  infinite,
}: {
  itemsLength: number;
  step: number;
  infinite: boolean;
}): State => ({
  currentItem: 0,
  inProp: false,
  transitionForward: true,
  itemsLength,
  step,
  infinite,
  touchPosition: null,
  touchMove: null,
});

const goToItemState = (
  {
    currentItem: stateCurrentItem,
    step,
    itemsLength,
    ...remainingState
  }: State,
  { transitionForward, currentItem }: TransitionOptions
) => ({
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

const stopAtStart = ({
  infinite,
  currentItem,
}: {
  infinite: boolean;
  currentItem: number;
}) => !infinite && currentItem === 0;

const stopAtEnd = ({
  infinite,
  currentItem,
  step,
  itemsLength,
}: {
  infinite: boolean;
  currentItem: number;
  step: number;
  itemsLength: number;
}) => !infinite && currentItem + step >= itemsLength;

const detectTransitionDirection = ({
  transitionForward: prevTransitionForward,
  ...state
}: State): boolean => {
  if (prevTransitionForward && stopAtEnd(state)) return false;
  if (!prevTransitionForward && stopAtStart(state)) return true;
  return prevTransitionForward;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const reducer = (state: State, { type, itemIndex }: Action): State => {
  switch (type) {
    case "goToPrevItem":
      return stopAtStart(state)
        ? { ...state }
        : goToItemState(state, { transitionForward: false });
    case "goToNextItem":
      return stopAtEnd(state)
        ? { ...state }
        : goToItemState(state, { transitionForward: true });
    case "autoPlay":
      return goToItemState(state, {
        transitionForward: state.infinite || detectTransitionDirection(state),
        stopAutoplay: false,
      });
    case "goToItem":
      return itemIndex === undefined || itemIndex === state.currentItem
        ? { ...state }
        : goToItemState(state, {
            transitionForward: itemIndex > state.currentItem,
            currentItem: itemIndex,
          });
    default:
      throw new Error();
  }
};

// eslint-disable-next-line max-lines-per-function
const Carousel: React.FC<Props> = ({
  step = 1,
  duration = 300,
  itemStyles = {},
  autoplay = false,
  autoplaySpeed = 3000,
  buttons = false,
  infinite = false,
  children,
}) => {
  const nodeRef = useRef(null); //https://github.com/reactjs/react-transition-group/issues/668#issuecomment-695162879

  const items = useMemo<Children>(
    () => prepareItems(children, { ...itemStyles, width: `${100 / step}%` }),
    [children]
  );

  const [{ currentItem, inProp, transitionForward }, dispatch] = useReducer(
    reducer,
    { itemsLength: items.length, step, infinite },
    initState
  );

  useEffect(() => {
    if (!autoplay) return;

    const autoplayTimeoutId = setTimeout(
      () => dispatch({ type: "autoPlay" }),
      autoplaySpeed + duration
    );

    return () => clearTimeout(autoplayTimeoutId);
  });

  const swipeHandlers = useSwipe({
    actionForward: () => dispatch({ type: "goToNextItem" }),
    actionBackward: () => dispatch({ type: "goToPrevItem" }),
  });

  return (
    <div className={styles.carouselContainer}>
      <SwitchTransition>
        <Transition
          key={currentItem}
          in={inProp}
          nodeRef={nodeRef}
          timeout={duration}
          unmountOnExit
        >
          {(state: string) => (
            <div
              className={styles.carouselSlider}
              style={{
                ...defaultStyle(duration),
                ...(transitionForward
                  ? transitionStylesForward
                  : transitionStylesReverse)[state],
              }}
              {...swipeHandlers}
            >
              {prepareSlides(items, currentItem, step, transitionForward).map(
                (slide) => slide
              )}
            </div>
          )}
        </Transition>
      </SwitchTransition>
      <Controls
        dispatch={dispatch}
        step={step}
        items={items}
        currentItem={currentItem}
        buttons={buttons}
      />
    </div>
  );
};

export default Carousel;
