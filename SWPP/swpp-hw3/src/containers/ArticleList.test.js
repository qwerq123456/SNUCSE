import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import ArticleList from "./ArticleList";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";

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

describe("<ArticleList />", () => {
  let articleList;

  beforeEach(() => {
    articleList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ArticleList} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render ArticleList", () => {
    const component = mount(articleList);
    const wrapper = component.find("ArticleList");
    expect(wrapper.length).toBe(1);
  });
  it("should render ArticleList when storedArticles", () => {
    const storedArticles = stubArticleInitialState;
    const component = shallow(<articleList storedArticles={storedArticles} />);
    const wrapper = component.find("ArticleList");
  });
});
