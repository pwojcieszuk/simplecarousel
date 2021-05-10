import React from "react";
import { CarouselState, Action } from "components/Carousel/logic/types";
import goToPrevItem from "components/Carousel/state/goToPrevItem";
import goToNextItem from "components/Carousel/state/goToNextItem";
import autoPlay from "components/Carousel/state/autoPlay";
import goToItemAtIndex from "components/Carousel/state/goToItemAtIndex";

const cssTranslate = (value: number | string) => `translateX(${value})`;

export const DEFAULT_STYLE = (duration: number): React.CSSProperties => ({
  transition: `transform ${duration}ms ease-in-out`,
  transform: cssTranslate(0),
});

export const TRANSITION_STYLES_FORWARD = {
  entering: { transform: cssTranslate(0) },
  entered: { transform: cssTranslate("-100%") },
  exiting: { transform: cssTranslate("-100%") },
  exited: { transform: cssTranslate("-200%") },
} as { [key: string]: React.CSSProperties };

export const TRANSITION_STYLES_REVERSE = {
  entering: { transform: cssTranslate("-100%") },
  entered: { transform: cssTranslate(0) },
  exiting: { transform: cssTranslate(0) },
  exited: { transform: cssTranslate("100%") },
} as { [key: string]: React.CSSProperties };

export const ACTIONS_TYPES = {
  GO_TO_PREV_ITEM: "goToPrevItem",
  GO_TO_NEXT_ITEM: "goToNextItem",
  AUTO_PLAY: "autoPlay",
  GO_TO_ITEM_AT_INDEX: "goToItemAtIndex",
};

export const ACTIONS: {
  [key: string]: (state: CarouselState, action: Action) => CarouselState;
} = {
  goToPrevItem,
  goToNextItem,
  autoPlay,
  goToItemAtIndex,
};
