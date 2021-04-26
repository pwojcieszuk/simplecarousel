import React, { useState } from "react";
import { Transition, SwitchTransition } from "react-transition-group";
import styles from "components/Carousel/carousel.module.scss";

type Props = {
  children?: React.ReactChild | React.ReactChild[];
};

const validItems = (children?: React.ReactChild | React.ReactChild[]) =>
  React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  );

const duration = 300;

const defaultStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  // eslint-disable-next-line sonarjs/no-duplicate-string
  transform: "translateX(0)",
};

const transitionStylesForward = {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  entering: { transform: "translateX(100%)" },
  entered: { transform: "translateX(0)" },
  exiting: { transform: "translateX(0)" },
  // eslint-disable-next-line sonarjs/no-duplicate-string
  exited: { transform: "translateX(-100%)" },
} as { [key: string]: React.CSSProperties };

const transitionStylesReverse = {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  entering: { transform: "translateX(-100%)" },
  entered: { transform: "translateX(0)" },
  exiting: { transform: "translateX(0)" },
  exited: { transform: "translateX(100%)" },
} as { [key: string]: React.CSSProperties };

/* eslint-disable */
const Carousel: React.FC<Props> = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [inProp, setInProp] = useState(false);
  const [transitionForward, setTransitionForward] = useState(true);

  const items = validItems(children);

  const step = 4;

  const slides = [
    ...items.slice(currentItem, currentItem + step),
    ...(currentItem + step > items.length - 1
      ? items.slice(0, currentItem - items.length + step)
      : []),
  ];

  const goToPrevItem = () => (
    setCurrentItem(
      currentItem - step >= 0
        ? currentItem - step
        : items.length + (currentItem - step)
    ),
    setInProp(true),
    setTransitionForward(false)
  );
  const goToNextItem = () => (
    setCurrentItem(
      currentItem + step < items.length
        ? currentItem + step
        : currentItem - items.length + step
    ),
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
                ...defaultStyle,
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
