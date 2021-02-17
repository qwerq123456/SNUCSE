import * as actionTypes from "./actionTypes";
import axios from "axios";

import { push } from "connected-react-router";

export const getComments_ = (comments) => {
  return { type: actionTypes.GET_ALL_COMMENT, comments: comments };
};

export const getComments = () => {
  return (dispatch) => {
    return axios
      .get("/api/comments")
      .then((res) => dispatch(getComments_(res.data)));
  };
};

export const getComment_ = (comment) => {
  return { type: actionTypes.GET_COMMENT, target: comment };
};

export const getComment = (id) => {
  return (dispatch) => {
    return axios.get("/api/comments/" + id).then((res) => {
      dispatch(getComment_(res.data));
    });
  };
};

export const postComment_ = (com) => {
  return {
    type: actionTypes.ADD_COMMENT,
    id: com.id,
    article_id: com.article_id,
    author_id: com.author_id,
    content: com.content,
  };
};

export const postComment = (com) => {
  return (dispatch) => {
    return axios.post("/api/comments/", com).then((res) => {
      dispatch(postComment_(res.data));
      dispatch(push("/articles/" + res.data.article_id));
    });
  };
};

export const editComment_ = (com) => {
  return {
    type: actionTypes.EDIT_COMMENT,
    id: com.id,
    author_id: com.author_id,
    title: com.title,
    content: com.content,
  };
};

export const editComment = (com) => {
  return (dispatch) => {
    return axios.patch("/api/comments/" + com.id, com).then((res) => {
      dispatch(editComment_(res.data));
      dispatch(push("/articles/" + res.data.article_id));
    });
  };
};

export const deleteComment_ = (id) => {
  return {
    type: actionTypes.DELETE_COMMENT,
    targetID: id,
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    return axios
      .delete("/api/comments/" + id)
      .then((res) => dispatch(deleteComment_(id)));
  };
};
