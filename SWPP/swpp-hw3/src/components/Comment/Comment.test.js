import React from "react";
import { shallow } from "enzyme";

import Comment from "./Comment";

describe("<Comment />", () => {
  it("should render without errors", () => {
    const component = shallow(<Comment />);
    const wrapper = component.find(".Comment");
    expect(wrapper.length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });

  it("should delete-comment-button works", () => {
    const mockDeleteComment = jest.fn();
    const comId = 3;
    const component = shallow(
      <Comment clickDeleteComment={mockDeleteComment} com_id={comId} />
    );
    const wrapper = component.find("button#delete-comment-button");
    wrapper.simulate("click");
    expect(mockDeleteComment).toHaveBeenCalledWith(comId);
  });

  it("should edit-comment-button works", () => {
    const mockEditComment = jest.fn();
    const component = shallow(<Comment clickEditComment={mockEditComment} />);
    const wrapper = component.find("button#edit-comment-button");
    wrapper.simulate("click");
  });
});
