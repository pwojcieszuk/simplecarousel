import React from "react";

const cssTranslate = (value: number | string) => `translateX(${value})`;

export const defaultStyle = (duration: number): React.CSSProperties => ({
  transition: `transform ${duration}ms ease-in-out`,
  transform: cssTranslate(0),
});

export const transitionStylesForward = {
  entering: { transform: cssTranslate(0) },
  entered: { transform: cssTranslate("-100%") },
  exiting: { transform: cssTranslate("-100%") },
  exited: { transform: cssTranslate("-200%") },
} as { [key: string]: React.CSSProperties };

export const transitionStylesReverse = {
  entering: { transform: cssTranslate("-100%") },
  entered: { transform: cssTranslate(0) },
  exiting: { transform: cssTranslate(0) },
  exited: { transform: cssTranslate("100%") },
} as { [key: string]: React.CSSProperties };
