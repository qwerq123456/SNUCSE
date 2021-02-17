import React from "react";

import Article from "./Article";
import { shallow } from "enzyme";

describe("<Article />", () => {
  it("should render without errors", () => {
    const component = shallow(<Article />);
    const wrapper = component.find(".Article");
    expect(wrapper.length).toBe(1);
  });
  it("should title button click good", () => {
    const mockClickDetail = jest.fn();
    const component = shallow(<Article clickTitle={mockClickDetail} />);
    const wrapper = component.find("button#title-button").at(0);
    wrapper.simulate("click");
  });
});
