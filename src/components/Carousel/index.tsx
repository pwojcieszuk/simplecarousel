import React, { useState, useMemo } from "react";
import { Transition, SwitchTransition } from "react-transition-group";
import styles from "components/Carousel/carousel.module.scss";

//use switch transition based on loopState prop to slide to next component that enters the stage

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

// eslint-disable-next-line max-lines-per-function
const Carousel: React.FC<Props> = ({ children }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [inProp, setInProp] = useState(false);
  const [transitionForward, setTransitionForward] = useState(true);

  const items = validItems(children);
  const slide = items[currentItem];

  const goToPrevItem = () => (
    setCurrentItem(currentItem > 0 ? currentItem - 1 : items.length - 1),
    setInProp(true),
    setTransitionForward(false)
  );
  const goToNextItem = () => (
    setCurrentItem(currentItem < items.length - 1 ? currentItem + 1 : 0),
    setInProp(true),
    setTransitionForward(true)
  );

  //TODO move through rest of the slides
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
              style={{
                ...defaultStyle,
                ...(transitionForward
                  ? transitionStylesForward
                  : transitionStylesReverse)[state],
              }}
            >
              {slide}
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
