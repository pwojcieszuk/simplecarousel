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
  itemsLength,
  step,
});

const reducer = (state: State, { type, itemIndex }: Action): State => {
  switch (type) {
    case "goToPrevItem":
      return {
        ...state,
        inProp: true,
        transitionForward: false,
        currentItem: calculatePrevItem(
          state.currentItem,
          state.step,
          state.itemsLength
        ),
      };
    case "goToNextItem":
      return {
        ...state,
        inProp: true,
        transitionForward: true,
        currentItem: calculateNextItem(
          state.currentItem,
          state.step,
          state.itemsLength
        ),
      };
    case "goToItem":
      return itemIndex === undefined || itemIndex === state.currentItem
        ? { ...state }
        : {
            ...state,
            inProp: true,
            transitionForward: itemIndex > state.currentItem,
            currentItem: itemIndex,
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

  const [{ currentItem, inProp, transitionForward }, dispatch] = useReducer(
    reducer,
    { itemsLength: items.length, step },
    initState
  );

  useEffect(() => {
    autoplay &&
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
