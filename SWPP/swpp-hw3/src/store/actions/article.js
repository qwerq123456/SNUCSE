import * as actionTypes from "./actionTypes";
import axios from "axios";

import { push } from "connected-react-router";

export const getArticles_ = (articles) => {
  return { type: actionTypes.GET_ALL_ARTICLE, articles: articles };
};

export const getArticles = () => {
  return (dispatch) => {
    return axios
      .get("/api/articles")
      .then((res) => dispatch(getArticles_(res.data)));
  };
};

export const getArticle_ = (article) => {
  return { type: actionTypes.GET_ARTICLE, target: article };
};

export const getArticle = (id) => {
  return (dispatch) => {
    return axios.get("/api/articles/" + id).then((res) => {
      dispatch(getArticle_(res.data));
    });
  };
};

export const postArticle_ = (ar) => {
  return {
    type: actionTypes.ADD_ARTICLE,
    id: ar.id,
    author: ar.author,
    title: ar.title,
    content: ar.content,
  };
};

export const postArticle = (ar) => {
  return (dispatch) => {
    return axios.post("/api/articles/", ar).then((res) => {
      dispatch(postArticle_(res.data));
      dispatch(push("/articles/" + res.data.id));
    });
  };
};

export const editArticle_ = (ar) => {
  return {
    type: actionTypes.EDIT_ARTICLE,
    id: ar.id,
    author: ar.author,
    title: ar.title,
    content: ar.content,
  };
};

export const editArticle = (ar) => {
  return (dispatch) => {
    return axios.put("/api/articles/" + ar.id, ar).then((res) => {
      dispatch(editArticle_(res.data));
      dispatch(push("/articles/" + res.data.id));
    });
  };
};

export const deleteArticle_ = (id) => {
  return {
    type: actionTypes.DELETE_ARTICLE,
    targetID: id,
  };
};

export const deleteArticle = (id) => {
  return (dispatch) => {
    return axios.delete("/api/articles/" + id).then((res) => {
      console.log(res), dispatch(deleteArticle_(id));
    });
  };
};
