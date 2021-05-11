import prepareItemsForCurrentTransformation from "components/Carousel/logic/prepareItemsForCurrentTransformation";

const slides = [0, 1, 2, 3, 4, 5, 6, 7];

describe("prepareItemsForCurrentTransformation", () => {
  it("returns the current item plus step previous when moving forwards", () => {
    expect(prepareItemsForCurrentTransformation(slides, 0, 3, true)).toEqual([
      5,
      6,
      7,
      0,
      1,
      2,
    ]);
  });
  it("returns the current item plus step previous when moving forwards and looping", () => {
    expect(prepareItemsForCurrentTransformation(slides, 7, 3, true)).toEqual([
      4,
      5,
      6,
      7,
      0,
      1,
    ]);
  });

  it("returns the current item plus step next when moving backwards", () => {
    expect(prepareItemsForCurrentTransformation(slides, 0, 3, false)).toEqual([
      0,
      1,
      2,
      3,
      4,
      5,
    ]);
  });
  it("returns the current item plus step next when moving forwards and looping", () => {
    expect(prepareItemsForCurrentTransformation(slides, 7, 3, false)).toEqual([
      7,
      0,
      1,
      2,
      3,
      4,
    ]);
  });
  it("returns the current item plus step next when moving forwards and looping without extra values", () => {
    expect(prepareItemsForCurrentTransformation(slides, 4, 3, true)).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
    ]);
  });
  it("returns the current item plus step next when moving backwards and looping without extra values", () => {
    expect(prepareItemsForCurrentTransformation(slides, 4, 3, false)).toEqual([
      4,
      5,
      6,
      7,
      0,
      1,
    ]);
  });
});
