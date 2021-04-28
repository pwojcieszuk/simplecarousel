export type Action = { type: string; itemIndex?: number };

export type ReactChildren = React.ReactChild | React.ReactChild[];

export type CarouselProps = {
  children: ReactChildren;
  step?: number;
  duration?: number;
};

export type CarouselState = {
  inProp?: boolean;
  transitionForward?: boolean;
  currentItem: number;
  step: number;
  itemsLength: number;
};

export type ControlsProps = {
  dispatch: React.Dispatch<Action>;
  items: React.ReactChild[] | React.ReactFragment[] | React.ReactPortal[];
  step: number;
};

export type CarouselChildren =
  | React.ReactChild[]
  | React.ReactFragment[]
  | React.ReactPortal[];
