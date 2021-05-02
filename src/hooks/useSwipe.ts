import React, { useReducer, useEffect } from "react";

type SwipeCallbacks = {
  actionForward: (...args: unknown[]) => void;
  actionBackward: (...args: unknown[]) => void;
};

type SwipeEvent = React.TouchEvent<HTMLElement>;

type SwipeHandlers = {
  onTouchStart: (e: SwipeEvent) => void;
  onTouchMove: (e: SwipeEvent) => void;
  onTouchEnd: () => void;
};

const initialState = {
  touchPosition: null,
  touchMove: null,
  touchEnd: false,
};

const reducer = (
  state: {
    touchPosition?: number | null;
    touchMove?: number | null;
    touchEnd: boolean;
  },
  {
    type,
    touchPosition,
    touchMove,
  }: { type: string; touchPosition?: number | null; touchMove?: number | null }
) => {
  switch (type) {
    case "touchStart":
      return { ...state, touchPosition };
    case "touchMove":
      return { ...state, touchMove };
    case "touchEnd":
      return { ...state, touchEnd: true };
    case "reset":
      return { ...initialState };
    default:
      throw new Error();
  }
};

const swipeStep = 5;

export default ({
  actionForward,
  actionBackward,
}: SwipeCallbacks): SwipeHandlers => {
  const [{ touchEnd, touchMove, touchPosition }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (!touchEnd || !touchPosition || !touchMove) return;

    const swiped = touchPosition - touchMove;

    if (swiped > swipeStep) actionForward();

    if (swiped < -swipeStep) actionBackward();

    dispatch({ type: "reset" });
  }, [touchEnd, touchMove, touchPosition]);

  return {
    onTouchStart: (e: SwipeEvent) =>
      dispatch({
        type: "touchStart",
        touchPosition: e.touches[0].clientX,
      }),

    onTouchMove: (e: SwipeEvent) =>
      dispatch({
        type: "touchMove",
        touchMove: e.touches[0].clientX,
      }),

    onTouchEnd: () => dispatch({ type: "touchEnd" }),
  };
};
