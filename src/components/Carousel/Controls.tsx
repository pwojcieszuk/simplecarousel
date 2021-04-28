import React from "react";
import styles from "components/Carousel/carousel.module.scss";
import { ControlsProps as Props } from "components/Carousel/logic/types";
import prepareButtons from "components/Carousel/logic/prepareButtons";

const Controls: React.FC<Props> = ({ dispatch, items, step }) => (
  <div className={styles.carouselBtns}>
    <button onClick={() => dispatch({ type: "goToPrevItem" })}>Prev</button>
    {prepareButtons(
      step,
      Object.keys(items).map((i) => parseInt(i))
    ).map((childIndex) => (
      <button
        key={childIndex}
        onClick={() => dispatch({ type: "goToItem", itemIndex: childIndex })}
        id={`${childIndex}`}
      />
    ))}
    <button onClick={() => dispatch({ type: "goToNextItem" })}>Next</button>
  </div>
);

export default Controls;
