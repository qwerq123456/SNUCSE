import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { history, middlewares } from "../store/store";
import * as actionTypes from "../store/actions/actionTypes";

const getMockCommentReducer = jest.fn(
  (CommentinitialState) => (state = CommentinitialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);
const getMockArticleReducer = jest.fn(
  (ArticleinitialState) => (state = ArticleinitialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

export const getMockStore = (CommentinitialState, ArticleinitialState) => {
  const mockCommentReducer = getMockCommentReducer(CommentinitialState);
  const mockArticleReducer = getMockArticleReducer(ArticleinitialState);
  const rootReducer = combineReducers({
    com: mockCommentReducer,
    ar: mockArticleReducer,
    router: connectRouter(history),
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return mockStore;
};
