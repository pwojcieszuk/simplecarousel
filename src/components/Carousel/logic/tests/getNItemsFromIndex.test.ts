import getNItemsFromIndex from "components/Carousel/logic/getNItemsFromIndex";

const items = [0, 1, 2, 3, 4, 5, 6, 7];

describe("getNItemsFromIndex", () => {
  it("returns the current item plus n others", () => {
    expect(getNItemsFromIndex(items, 0, 3)).toEqual([0, 1, 2]);
  });
  it("returns the current item plus n others and rotates items array if index is less than n from items end", () => {
    expect(getNItemsFromIndex(items, 7, 3)).toEqual([7, 0, 1]);
  });
  it("returns the current item plus n others and rotates items array without extra values if index is less than n from items end", () => {
    expect(getNItemsFromIndex(items, 1, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
