import React from "react";
import styles from "components/Carousel/carousel.module.scss";
import { ControlsProps as Props } from "components/Carousel/logic/types";

const Controls: React.FC<Props> = ({ dispatch, items }) => (
  <div className={styles.carouselBtns}>
    <button onClick={() => dispatch({ type: "goToPrevItem" })}>Prev</button>
    {Object.keys(items).map((childIndex) => (
      <button
        key={childIndex}
        onClick={() =>
          dispatch({ type: "goToItem", itemIndex: parseInt(childIndex) })
        }
      />
    ))}
    <button onClick={() => dispatch({ type: "goToNextItem" })}>Next</button>
  </div>
);

export default Controls;
