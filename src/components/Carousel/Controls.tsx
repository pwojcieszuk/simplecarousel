import React from "react";
import styles from "components/Carousel/carousel.module.scss";
import { ControlsProps as Props } from "components/Carousel/logic/types";
import prepareButtons from "components/Carousel/logic/prepareButtons";

const Controls: React.FC<Props> = ({
  dispatch,
  items,
  step,
  currentItem,
  buttons,
}) => (
  <>
    <div
      className={styles.carouselPrevBtn}
      onClick={() => dispatch({ type: "goToPrevItem" })}
    />
    <div className={styles.carouselBtns}>
      {buttons &&
        prepareButtons(
          step,
          Object.keys(items).map((i) => parseInt(i))
        ).map((childIndex) => (
          <div
            key={childIndex}
            onClick={() =>
              dispatch({ type: "goToItem", itemIndex: childIndex })
            }
            className={
              childIndex === currentItem ? styles.carouselBtnActive : undefined
            }
          />
        ))}
    </div>
    <div
      className={styles.carouselNextBtn}
      onClick={() => dispatch({ type: "goToNextItem" })}
    />
  </>
);

export default Controls;
