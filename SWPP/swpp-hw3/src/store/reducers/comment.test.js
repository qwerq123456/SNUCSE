import React from "react";

import reducer from "./comment";
import * as actionTypes from "../actions/actionTypes";

const stubComment = {
  id: 1,
  title: "SWPP",
  content: "Study mid-term",
  done: false,
};

describe("Comment Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ comments: [], selectedComment: null });
  });

  it("should add comment", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_COMMENT,
      id: stubComment.id,
      title: stubComment.title,
      content: stubComment.content,
      done: stubComment.done,
    });
  });

  it("should delete comment", () => {
    const stubInitialState = {
      comments: [stubComment],
      selectedComment: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_COMMENT,
      targetID: 1,
    });
    expect(newState).toEqual({
      comments: [],
      selectedComment: null,
    });
  });

  it("should get comment", () => {
    const stubSelectedComment = { id: 1, title: "title", content: "content" };
    const newState = reducer(undefined, {
      type: actionTypes.GET_COMMENT,
      target: stubSelectedComment,
    });
    expect(newState).toEqual({
      comments: [],
      selectedComment: stubSelectedComment,
    });
  });

  it("should get all comments", () => {
    const stubComments = [
      { id: 1, title: "1", content: "1", done: false },
      { id: 2, title: "2", content: "2", done: false },
      { id: 3, title: "3", content: "3", done: false },
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_ALL_COMMENT,
      comments: stubComments,
    });
  });
  it("should edit comment", () => {
    const stubComments = [
      { id: 1, title: "1", content: "1", done: false },
      { id: 2, title: "2", content: "2", done: false },
      { id: 3, title: "3", content: "3", done: false },
    ];
    const newState = reducer(undefined, {
      type: actionTypes.EDIT_COMMENT,
      comments: [
        { id: 1, title: "SWPP", content: "Study mid-term", done: false },
        { id: 2, title: "2", content: "2", done: false },
        { id: 3, title: "3", content: "3", done: false },
      ],
    });
  });
});
