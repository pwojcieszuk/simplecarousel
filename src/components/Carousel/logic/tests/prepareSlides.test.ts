import prepareSlides from "components/Carousel/logic/prepareSlides";

const slides = [0, 1, 2, 3, 4, 5, 6, 7];

describe("prepareSlides", () => {
  it("returns the current item plus step previous when moving forwards", () => {
    expect(prepareSlides(slides, 0, 3, true)).toEqual([5, 6, 7, 0, 1, 2]);
  });
  it("returns the current item plus step previous when moving forwards and looping", () => {
    expect(prepareSlides(slides, 7, 3, true)).toEqual([4, 5, 6, 7, 0, 1]);
  });

  it("returns the current item plus step next when moving backwards", () => {
    expect(prepareSlides(slides, 0, 3, false)).toEqual([0, 1, 2, 3, 4, 5]);
  });
  it("returns the current item plus step next when moving forwards and looping", () => {
    expect(prepareSlides(slides, 7, 3, false)).toEqual([7, 0, 1, 2, 3, 4]);
  });
});
