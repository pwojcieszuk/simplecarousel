import React from "react";
import { shallow } from "enzyme";
import Controls from "components/Carousel/Controls";

describe("Carousel", () => {
  it("Renders", () => {
    const wrapper = shallow(
      <Controls dispatch={() => true} items={[0]} step={3} currentItem={0} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
