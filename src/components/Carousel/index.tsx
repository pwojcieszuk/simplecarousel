import React, { useMemo, useReducer, useEffect, useRef } from "react";
import { Transition, SwitchTransition } from "react-transition-group";
import styles from "components/Carousel/carousel.module.scss";
import {
  DEFAULT_STYLE,
  TRANSITION_STYLES_FORWARD,
  TRANSITION_STYLES_REVERSE,
  ACTIONS_TYPES,
  ACTIONS,
} from "components/Carousel/constants";

import prepareItemsForCurrentTransformation from "components/Carousel/logic/prepareItemsForCurrentTransformation";

import filterChildrenAsValidReactElements from "components/Carousel/utils/filterChildrenAsValidReactElements";

import Controls from "components/Carousel/Controls";

import useSwipe from "hooks/useSwipe";

import initState from "components/Carousel/state/init";

import {
  Action,
  CarouselProps as Props,
  CarouselState as State,
  CarouselChildren as Children,
} from "components/Carousel/logic/types";

const reducer = (state: State, action: Action): State =>
  ACTIONS[action.type](state, action);

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
    () =>
      filterChildrenAsValidReactElements(children, {
        ...itemStyles,
        width: `${100 / step}%`,
      }),
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
      () => dispatch({ type: ACTIONS_TYPES["AUTO_PLAY"] }),
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
                ...DEFAULT_STYLE(duration),
                ...(transitionForward
                  ? TRANSITION_STYLES_FORWARD
                  : TRANSITION_STYLES_REVERSE)[state],
              }}
              {...swipeHandlers}
            >
              {prepareItemsForCurrentTransformation(
                items,
                currentItem,
                step,
                transitionForward
              ).map((slide) => slide)}
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
