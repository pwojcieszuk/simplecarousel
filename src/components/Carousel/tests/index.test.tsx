import React from "react";
import { shallow } from "enzyme";
import Carousel from "components/Carousel";

describe("Carousel", () => {
  it("Renders", () => {
    const wrapper = shallow(<Carousel>some child</Carousel>);
    expect(wrapper).toMatchSnapshot();
  });
});
