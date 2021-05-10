import React from "react";
import {
  CarouselChildren,
  ReactChildren,
} from "components/Carousel/logic/types";

export default (
  children: ReactChildren,
  style: React.CSSProperties
): CarouselChildren =>
  React.Children.toArray(children).map(
    (child) =>
      React.isValidElement(child) &&
      React.cloneElement(child, {
        style,
      })
  );
