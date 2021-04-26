import calculatePrevItem from "components/Carousel/logic/calculatePrevItem";

describe("calculatePrevItem", () => {
  it("calculates prev item for carousel properly", () => {
    expect(calculatePrevItem(4, 3, 8)).toEqual(1);
  });
  it("calculates prev item for carousel properly when it loops inifinitely", () => {
    expect(calculatePrevItem(1, 3, 8)).toEqual(6);
  });
});
