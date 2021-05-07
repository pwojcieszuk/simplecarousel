import React from "react";
import ReactDOM from "react-dom";
import Carousel from "components/Carousel";
import styles from "./carousel-demo.module.scss";

const importAll = (r: __WebpackModuleApi.RequireContext) =>
  r.keys().map((item) => r(item).default);

const demoImages = importAll(
  require.context("assets/images/demo/", false, /\.(png|jpe?g|svg)$/)
);

ReactDOM.render(
  <React.StrictMode>
    <div className={styles.carouselContainer}>
      <Carousel step={3} autoplay infinite buttons>
        {demoImages.map((image: string, idx: number) => (
          <img key={idx} src={image} />
        ))}
      </Carousel>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
