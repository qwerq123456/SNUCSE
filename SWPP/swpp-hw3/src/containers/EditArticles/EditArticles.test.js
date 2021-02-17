import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import EditArticle from "./EditArticles";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";

const stubArticleInitialState = {
  articles: [{ id: 1, author_id: 1, title: "TITLE_1", content: "CONTENT_1" }],
  selectedArticle: {
    id: 1,
    author_id: 1,
    title: "TITLE_1",
    content: "CONTENT_1",
  },
};
const stubCommentInitialState = {
  comments: [],
  selectedComment: null,
};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubCommentInitialState
);

describe("<EditArticle />", () => {
  let defaultprops, editArticle, spyHistoryPush;

  defaultprops = {
    match: {
      params: {
        id: 1,
      },
    },
  };
  beforeEach(() => {
    editArticle = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <EditArticle {...defaultprops} history={history} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render EditArticle", () => {
    const component = mount(editArticle);
    const wrapper = component.find("EditArticle");
    expect(wrapper.length).toBe(1);
  });

  it(`should set title`, () => {
    const title = "TITLE";
    const component = mount(editArticle);
    const wrapper = component.find("#article-title-input");
    wrapper.simulate("change", { target: { value: title } });
    const editArticleInstance = component
      .find(EditArticle.WrappedComponent)
      .instance();
    expect(editArticleInstance.state.title).toEqual(title);
  });

  it(`should set content`, () => {
    const content = "CONTENT";
    const component = mount(editArticle);
    const wrapper = component.find("#article-content-input");
    wrapper.simulate("change", { target: { value: content } });
    const editArticleInstance = component
      .find(EditArticle.WrappedComponent)
      .instance();
    expect(editArticleInstance.state.content).toEqual(content);
  });
  it("should write tab button click good", () => {
    const component = mount(editArticle);
    const wrapper = component.find("button#write-tab-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should preview tab button click good", () => {
    const component = mount(editArticle);
    const wrapper = component.find("button#preview-tab-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);

    const wrapper1 = component.find(".WriteArticlePreview");
    expect(wrapper1.length).toBe(1);

    const wrapper2 = component.find("#preview-tab-button");
    wrapper2.simulate("click");
    expect(wrapper2.length).toBe(1);

    const wrapper3 = component.find("#write-tab-button");
    wrapper3.simulate("click");
    expect(wrapper3.length).toBe(1);
  });

  it("should confirm create article button click good", () => {
    const component = mount(editArticle);

    const wrapper1 = component.find("#article-title-input");
    wrapper1.simulate("change", { target: { value: "title" } });

    const wrapper2 = component.find("#article-content-input");
    wrapper2.simulate("change", { target: { value: "content" } });
    const wrapper = component.find("button#confirm-edit-article-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it("should back create article button click good", () => {
    const component = mount(editArticle);
    const wrapper = component.find("button#back-edit-article-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });
});
