export type Action = {
  type: string;
  itemIndex?: number;
  stopAutoplay?: boolean;
  touchPosition?: number | null;
  touchMove?: number | null;
};

export type ReactChildren = React.ReactChild | React.ReactChild[];

export type CarouselProps = {
  children: ReactChildren;
  step?: number;
  duration?: number;
  itemStyles?: React.CSSProperties;
  autoplay?: boolean;
  autoplaySpeed?: number;
  buttons?: boolean;
};

export type CarouselState = {
  inProp?: boolean;
  transitionForward?: boolean;
  currentItem: number;
  step: number;
  itemsLength: number;
  stopAutoplay?: boolean;
  touchPosition?: number | null;
  touchMove?: number | null;
};

export type ControlsProps = {
  dispatch: React.Dispatch<Action>;
  items: React.ReactChild[] | React.ReactFragment[] | React.ReactPortal[];
  step: number;
  currentItem: number;
  buttons?: boolean;
};

export type CarouselChildren =
  | React.ReactChild[]
  | React.ReactFragment[]
  | React.ReactPortal[];
