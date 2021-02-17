import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import ArticleDetail from "./ArticleDetail";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";

import * as actionCreatorArticle from "../../store/actions/article";
import * as actionCreatorComment from "../../store/actions/comment";

jest.mock("../../components/Comment/Comment", () => {
  return jest.fn((props) => {
    return (
      <div className="spyComment">
        <button
          id="edit-comment-button"
          onClick={props.clickDeleteComment(props.com_id)}
        ></button>
        <button
          id="delete-comment-button"
          onClick={props.clickEditComment(props)}
        ></button>
      </div>
    );
  });
});

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
  comments: [
    { id: 1, article_id: 1, author_id: 2, content: "TEST_COMMENT_1" },
    { id: 2, article_id: 1, author_id: 1, content: "TEST_COMMENT_2" },
  ],
  selectedComment: null,
};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubCommentInitialState
);

describe("<ArticleDetail />", () => {
  let articleDetail;
  let defaultprops, spyHistoryPush, spyPostComment;
  defaultprops = {
    match: {
      params: {
        id: 1,
      },
    },
  };
  beforeEach(() => {
    articleDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <ArticleDetail {...defaultprops} history={history} />
              )}
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

  it("should render ArticleDetail", () => {
    const component = mount(articleDetail);
    const wrapper = component.find("ArticleDetail");
    expect(wrapper.length).toBe(1);
  });

  it("should confirm create comment button click good", () => {
    const component = mount(articleDetail);
    const wrapper = component.find("#confirm-create-comment-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should back detail article button click good", () => {
    const component = mount(articleDetail);
    const wrapper = component.find("#back-detail-article-button");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it(`should set new comment`, () => {
    const content = "CONTENT";
    const component = mount(articleDetail);
    const wrapper = component.find("#new-comment-content-input");
    wrapper.simulate("change", { target: { value: content } });
    const articleDetailInstance = component
      .find(ArticleDetail.WrappedComponent)
      .instance();
    expect(articleDetailInstance.state.newcomment).toEqual(content);
    const buttonWrapper = component.find("#confirm-create-comment-button");
    buttonWrapper.simulate("click");
  });
});
