export type Action = {
  type: string;
  itemIndex?: number;
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
  infinite?: boolean;
};

export type CarouselState = {
  inProp?: boolean;
  transitionForward: boolean;
  currentItem: number;
  step: number;
  itemsLength: number;
  touchPosition?: number | null;
  touchMove?: number | null;
  infinite: boolean;
};

export type TransitionOptions = {
  transitionForward: boolean;
  stopAutoplay?: boolean;
  currentItem?: number;
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
