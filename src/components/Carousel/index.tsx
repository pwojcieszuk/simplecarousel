import React, { useState, useMemo } from "react";
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

type Props = {
  children: React.ReactChild | React.ReactChild[];
  step?: number;
  duration?: number;
};

const validItems = (children: React.ReactChild | React.ReactChild[]) =>
  React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  );

// eslint-disable-next-line max-lines-per-function
const Carousel: React.FC<Props> = ({ step = 1, duration = 300, children }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [inProp, setInProp] = useState(false);
  const [transitionForward, setTransitionForward] = useState(true);

  const items = useMemo<
    React.ReactChild[] | React.ReactFragment[] | React.ReactPortal[]
  >(() => validItems(children), [children]);

  const slides = prepareSlides(items, currentItem, step);

  const goToPrevItem = () => (
    setCurrentItem(calculateNextItem(currentItem, step, items.length)),
    setInProp(true),
    setTransitionForward(false)
  );
  const goToNextItem = () => (
    setCurrentItem(calculatePrevItem(currentItem, step, items.length)),
    setInProp(true),
    setTransitionForward(true)
  );

  const goToItem = (itemIndex: number) => () =>
    itemIndex !== currentItem &&
    (setCurrentItem(itemIndex),
    setInProp(true),
    setTransitionForward(itemIndex > currentItem));

  return (
    <div className={styles.carouselContainer}>
      <SwitchTransition>
        <Transition
          key={currentItem}
          in={inProp}
          timeout={duration}
          className={styles.carouselSlider}
        >
          {(state: string) => (
            <div
              className={styles.carouselItem}
              style={{
                ...defaultStyle(duration),
                ...(transitionForward
                  ? transitionStylesForward
                  : transitionStylesReverse)[state],
              }}
            >
              {slides.map((slide) => slide)}
            </div>
          )}
        </Transition>
      </SwitchTransition>
      <div className={styles.carouselBtns}>
        <button onClick={goToPrevItem}>Prev</button>
        {Object.keys(items).map((childIndex) => (
          <button key={childIndex} onClick={goToItem(parseInt(childIndex))} />
        ))}
        <button onClick={goToNextItem}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;
