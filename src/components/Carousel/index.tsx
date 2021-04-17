import React from "react";
// import styles from "components/Carousel/carousel.module.scss";

type Props = {
  children?: React.ReactChild | React.ReactChild[];
};

const Carousel: React.FC<Props> = ({ children }) => {
  return (
    <>
      {React.Children.map(
        children,
        (child) =>
          React.isValidElement(child) &&
          React.cloneElement(child, { className: "styles.carouselItem" })
      )}
    </>
  );
};

export default Carousel;
