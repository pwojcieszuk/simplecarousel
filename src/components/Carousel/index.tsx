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

import {
  Action,
  CarouselProps as Props,
  CarouselState as State,
  CarouselChildren as Children,
} from "components/Carousel/logic/types";

const initState = ({
  itemsLength,
  step,
}: {
  itemsLength: number;
  step: number;
}) => ({
  currentItem: 0,
  inProp: false,
  transitionForward: true,
  stopAutoplay: false,
  itemsLength,
  step,
});

const commonTransitionState = (
  {
    currentItem: stateCurrentItem,
    step,
    itemsLength,
    ...remainingState
  }: State,
  transitionForward: boolean,
  currentItem?: number
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

const reducer = (
  state: State,
  { type, itemIndex, stopAutoplay = false }: Action
): State => {
  switch (type) {
    case "goToPrevItem":
      return {
        ...commonTransitionState(state, false),
        stopAutoplay,
      };
    case "goToNextItem":
      return {
        ...commonTransitionState(state, true),
        stopAutoplay,
      };
    case "goToItem":
      return itemIndex === undefined || itemIndex === state.currentItem
        ? { ...state }
        : {
            ...commonTransitionState(
              state,
              itemIndex > state.currentItem,
              itemIndex
            ),
            stopAutoplay,
          };
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
  children,
}) => {
  const nodeRef = useRef(null); //https://github.com/reactjs/react-transition-group/issues/668#issuecomment-695162879

  const items = useMemo<Children>(
    () => prepareItems(children, { ...itemStyles, width: `${100 / step}%` }),
    [children]
  );

  const [
    { currentItem, inProp, transitionForward, stopAutoplay },
    dispatch,
  ] = useReducer(reducer, { itemsLength: items.length, step }, initState);

  useEffect(() => {
    autoplay &&
      !stopAutoplay &&
      setTimeout(
        () => dispatch({ type: "goToNextItem" }),
        autoplaySpeed + duration
      );
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
