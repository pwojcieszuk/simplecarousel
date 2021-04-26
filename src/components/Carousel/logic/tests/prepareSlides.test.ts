import prepareSlides from "components/Carousel/logic/prepareSlides";

const slides = Array.from(Array(8).keys());

describe("prepareSlides", () => {
  it("returns the current item plus step others", () => {
    expect(prepareSlides(slides, 0, 3)).toEqual([0, 1, 2]);
  });
  it("returns the current item plus step others in case of infinite loop", () => {
    expect(prepareSlides(slides, 6, 3)).toEqual([6, 7, 0]);
  });
});
