import React from "react";
import {
  CarouselChildren,
  ReactChildren,
} from "components/Carousel/logic/types";

export default (children: ReactChildren): CarouselChildren =>
  React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  );
