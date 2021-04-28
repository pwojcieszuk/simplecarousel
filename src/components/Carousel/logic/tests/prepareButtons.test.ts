import prepareButtons from "components/Carousel/logic/prepareButtons";

describe("prepareButtons", () => {
  it("returns original array for step of 1", () => {
    expect(prepareButtons(1, [0, 1, 2])).toEqual([0, 1, 2]);
  });
  it("returns every 3rd element for step 3 and array length divisible by 3", () => {
    expect(prepareButtons(3, [0, 1, 2, 3, 4, 5, 6, 7, 8])).toEqual([0, 3, 6]);
  });
  it("returns every 3rd element and proper last arg for step 3 and array length not divisible by 3", () => {
    expect(prepareButtons(3, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([
      0,
      3,
      6,
      9,
    ]);
  });
});
