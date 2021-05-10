import React, { useRef, useEffect, useState } from "react";

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

type TouchEventData = {
  touchPosition: number | null;
  touchMove?: number | null;
};

const initTouchEventData: TouchEventData = {
  touchPosition: null,
  touchMove: null,
};

const swipeStep = 5;

export default ({
  actionForward,
  actionBackward,
}: SwipeCallbacks): SwipeHandlers => {
  const touchEventData = useRef<TouchEventData>(initTouchEventData);
  const [touchEnd, setTouchEnd] = useState(false);

  useEffect(() => {
    const { touchPosition, touchMove } = touchEventData.current;

    if (!touchEnd || touchPosition === null || touchMove === null) return;

    const swiped = Number(touchPosition) - Number(touchMove); //https://github.com/microsoft/TypeScript/issues/37178

    if (swiped > swipeStep) actionForward();

    if (swiped < -swipeStep) actionBackward();

    touchEventData.current = { ...initTouchEventData };
    setTouchEnd(false);
  }, [touchEnd]);

  return {
    onTouchStart: (e: SwipeEvent) =>
      (touchEventData.current.touchPosition = e.touches[0].clientX),
    onTouchMove: (e: SwipeEvent) =>
      (touchEventData.current.touchMove = e.touches[0].clientX),
    onTouchEnd: () => setTouchEnd(true),
  };
};
