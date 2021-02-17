import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import WriteArticle from "./WriteArticle";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";

const stubArticleInitialState = {
  articles: [],
  selectedArticle: null,
};
const stubCommentInitialState = {
  comments: [],
  selectedComment: null,
};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubCommentInitialState
);
describe("<WriteArticle />", () => {
  let writeArticle;

  beforeEach(() => {
    writeArticle = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <WriteArticle history={history} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render WriteArticle", () => {
    const component = mount(writeArticle);
    const wrapper = component.find("WriteArticle");
    expect(wrapper.length).toBe(0);
  });

  it(`should set title`, () => {
    const title = "TITLE";
    const component = mount(writeArticle);
    const wrapper = component.find("#article-title-input");
    wrapper.simulate("change", { target: { value: title } });
    const writeArticleInstance = component
      .find(WriteArticle.WrappedComponent)
      .instance();
    expect(writeArticleInstance.state.title).toEqual(title);
  });

  it(`should set content`, () => {
    const content = "CONTENT";
    const component = mount(writeArticle);
    const wrapper = component.find("#article-content-input");
    wrapper.simulate("change", { target: { value: content } });
    const writeArticleInstance = component
      .find(WriteArticle.WrappedComponent)
      .instance();
    expect(writeArticleInstance.state.content).toEqual(content);
  });
  it("should write tab button click good", () => {
    const component = mount(writeArticle);
    const wrapper = component.find("button#write-tab-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should preview tab button click good", () => {
    const component = mount(writeArticle);
    const wrapper = component.find("button#preview-tab-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);

    const wrapper1 = component.find(".WriteArticlePreview");
    expect(wrapper1.length).toBe(1);

    // const wrapper5 = component.find("back-create-article-button");
    // wrapper5.simulate("click");
    // expect(wrapper5.length).toBe(1);

    // const wrapper4 = component.find("confirm-create-article-button");
    // wrapper4.simulate("click");
    // expect(wrapper4.length).toBe(1);

    const wrapper2 = component.find("#preview-tab-button");
    wrapper2.simulate("click");
    expect(wrapper2.length).toBe(1);

    const wrapper3 = component.find("#write-tab-button");
    wrapper3.simulate("click");
    expect(wrapper3.length).toBe(1);
  });

  it("should confirm create article button click good", () => {
    const component = mount(writeArticle);
    const wrapper = component.find("button#confirm-create-article-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should back create article button click good", () => {
    const component = mount(writeArticle);
    const wrapper = component.find("button#back-create-article-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });
});
