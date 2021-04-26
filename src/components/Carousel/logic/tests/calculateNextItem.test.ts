import calculateNextItem from "components/Carousel/logic/calculateNextItem";

describe("calculateNextItem", () => {
  it("calculates next item for carousel properly", () => {
    expect(calculateNextItem(1, 3, 8)).toEqual(4);
  });
  it("calculates next item for carousel properly when it loops inifinitely", () => {
    expect(calculateNextItem(6, 3, 8)).toEqual(1);
  });
});
