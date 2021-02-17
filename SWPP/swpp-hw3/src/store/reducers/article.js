import * as actionTypes from "../actions/actionTypes";

const initialState = {
  articles: [],
  selectedArticle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      const newArticle = {
        id: action.id,
        title: action.title,
        content: action.content,
        done: action.done,
      };
      return { ...state, articles: state.articles.concat(newArticle) };
    case actionTypes.EDIT_ARTICLE:
      const editArticle = {
        id: action.id,
        title: action.title,
        content: action.content,
        done: action.done,
      };
      const editArticles = state.articles.map((article) => {
        if (article.id === action.id) {
          editArticle;
        } else {
          article;
        }
      });
      return { ...state, articles: editArticles };
    case actionTypes.DELETE_ARTICLE:
      const deletedarticles = state.articles.filter((article) => {
        return article.id !== action.targetID;
      });
      return { ...state, articles: deletedarticles };
    case actionTypes.GET_ARTICLE:
      return { ...state, selectedArticle: action.target };
    case actionTypes.GET_ALL_ARTICLE:
      return { ...state, articles: action.articles };
    default:
      return state;
  }
};

export default reducer;
