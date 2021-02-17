import * as actionTypes from "../actions/actionTypes";

const initialState = {
  comments: [],
  selectedComment: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COMMENT:
      const newComment = {
        id: action.id,
        article_id: action.article_id,
        author_id: action.author_id,
        content: action.content,
      };
      return { ...state, comments: state.comments.concat(newComment) };
    case actionTypes.EDIT_COMMENT:
      const editComment = {
        id: action.id,
        article_id: action.article_id,
        author_id: action.author_id,
        content: action.content,
      };
      const editComments = state.comments.map((comment) => {
        if (comment.id === action.id) {
          editComment;
        } else {
          comment;
        }
      });
      return { ...state, comments: editComments };
    case actionTypes.DELETE_COMMENT:
      const deletedcomments = state.comments.filter((comment) => {
        return comment.id !== action.targetID;
      });
      return { ...state, comments: deletedcomments };
    case actionTypes.GET_COMMENT:
      return { ...state, selectedComment: action.target };
    case actionTypes.GET_ALL_COMMENT:
      return { ...state, comments: action.comments };
    default:
      return state;
  }
};

export default reducer;
