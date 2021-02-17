import React from "react";

import reducer from "./article";
import * as actionTypes from "../actions/actionTypes";

const stubArticle = {
  id: 1,
  title: "SWPP",
  content: "Study mid-term",
  done: false,
};

describe("Article Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ articles: [], selectedArticle: null });
  });

  it("should add article", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_ARTICLE,
      id: stubArticle.id,
      title: stubArticle.title,
      content: stubArticle.content,
      done: stubArticle.done,
    });
  });

  it("should delete article", () => {
    const stubInitialState = {
      articles: [stubArticle],
      selectedArticle: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_ARTICLE,
      targetID: 1,
    });
    expect(newState).toEqual({
      articles: [],
      selectedArticle: null,
    });
  });

  it("should get article", () => {
    const stubSelectedArticle = { id: 1, title: "title", content: "content" };
    const newState = reducer(undefined, {
      type: actionTypes.GET_ARTICLE,
      target: stubSelectedArticle,
    });
    expect(newState).toEqual({
      articles: [],
      selectedArticle: stubSelectedArticle,
    });
  });

  it("should get all articles", () => {
    const stubArticles = [
      { id: 1, title: "1", content: "1", done: false },
      { id: 2, title: "2", content: "2", done: false },
      { id: 3, title: "3", content: "3", done: false },
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_ALL_ARTICLE,
      articles: stubArticles,
    });
  });

  it("should edit article", () => {
    const stubArticles = [
      { id: 1, title: "1", content: "1", done: false },
      { id: 2, title: "2", content: "2", done: false },
      { id: 3, title: "3", content: "3", done: false },
    ];
    const newState = reducer(undefined, {
      type: actionTypes.EDIT_ARTICLE,
      articles: [
        { id: 1, title: "SWPP", content: "Study mid-term", done: false },
        { id: 2, title: "2", content: "2", done: false },
        { id: 3, title: "3", content: "3", done: false },
      ],
    });
  });
});
