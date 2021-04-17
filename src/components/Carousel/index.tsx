import React, { useEffect, useRef, useReducer, useMemo } from "react";
import styles from "components/Carousel/carousel.module.scss";

const initialState = (validItemsCount: number) => ({
  currentItem: 0,
  resetLoop: false,
  // useTransition: true,
  // itemsOrder: Array(validItemsCount).fill(0),
  // loopStarted: false,
  // reRender: false,
});

/* eslint-disable */
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setCurrentItem":
      return {
        ...state,
        currentItem: action.value.item,
        resetLoop: action.value.resetLoop || false,
      };
    case "setItemsOrder":
      return { ...state, itemsOrder: action.value };
    // case "setUseTransition":
    //   return { ...state, useTransition: action.value };
    // case "reorderItems":
    //   return {
    //     ...state,
    //     itemsOrder: action.value.itemsOrder,
    //     currentItem: action.value.currentItem,
    //   };
    // case "startLoop":
    //   return {
    //     ...state,
    //     loopStarted: true,
    //   };
    // case "reRender":
    //   return {
    //     ...state,
    //     reRender: true,
    //   };
    default:
      throw new Error();
  }
};

type Props = {
  children?: React.ReactChild | React.ReactChild[];
};

//TODO: display only 3 items - prev, current and next
//on transition - transform, then useEffect to re-render with new set of items after the change
//calculate proper items in separate logic

/* 
1. stop transition
2. reorder and transform to 0
3. start transition
4. transform to 1
5. stop transition
6. reorder back and transform to 0 
7. start transition

*/

const rotate = (arr: unknown[], count = 1) => [
  ...arr.slice(0, arr.length - count),
  ...Array.from({ length: count }, (_, i) => -1 - i),
];

// eslint-disable-next-line max-lines-per-function
const Carousel: React.FC<Props> = ({ children }) => {
  const validItems = useMemo(
    () =>
      React.Children.toArray(children).filter((child) =>
        React.isValidElement(child)
      ),
    [children]
  );

  const validItemsCount = validItems.length;

  const [state, dispatch] = useReducer(reducer, initialState(validItemsCount));

  const itemsOrder = useRef(Array(validItemsCount).fill(0));
  const useTransition = useRef(true);

  const lastItem = state.currentItem + 1 === validItemsCount;

  const goToItem = (itemIndex: number) => () =>
    dispatch({ type: "setCurrentItem", value: { item: itemIndex } });

  const goToNextItem = () =>
    lastItem
      ? goToNextItemInfinite()
      : dispatch({
          type: "setCurrentItem",
          value: { item: state.currentItem + 1 },
        });

  useEffect(() => {
    if (!state.resetLoop) {
      useTransition.current = true;
      return;
    }
    itemsOrder.current = Array(validItemsCount).fill(0);
    useTransition.current = false;

    setTimeout(
      () =>
        dispatch({
          type: "setCurrentItem",
          value: { item: 0, resetLoop: false },
        }),
      1400
    );
  }, [state.resetLoop]);

  const goToNextItemInfinite = () => {
    useTransition.current = false;
    itemsOrder.current = rotate(itemsOrder.current, 1);
    dispatch({
      type: "setCurrentItem",
      value: { item: 0 },
    });

    setTimeout(() => {
      useTransition.current = true;
      dispatch({
        type: "setCurrentItem",
        value: { item: 1, resetLoop: true },
      });
    }, 0);
  };

  const goToPrevItem = () =>
    dispatch({
      type: "setCurrentItem",
      value: { item: state.currentItem > 0 ? state.currentItem - 1 : 0 },
    });

  const getSlidesOffset = (itemIndex: number) => `-${itemIndex * 100}%`;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselSlider}>
        {validItems.map((item, itemIndex) =>
          React.cloneElement(item as React.ReactElement, {
            className: styles.carouselItem,
            style: {
              transform: `translateX(${getSlidesOffset(state.currentItem)})`,
              ...(useTransition.current && {
                transition: "transform 1600ms",
              }),
              order: itemsOrder.current[itemIndex],
            },
          })
        )}
      </div>
      <div className={styles.carouselBtns}>
        <button onClick={goToPrevItem}>Prev</button>
        {validItems.map((child, childIndex) => (
          <button key={childIndex} onClick={goToItem(childIndex)} />
        ))}
        <button onClick={goToNextItem}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;
