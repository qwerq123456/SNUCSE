import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import Comment from "../Comment/Comment";

class ArticleDetail extends Component {
  state = {
    id: "",
    author: "",
    title: "",
    content: "",
    newcomment: "",
  };
  componentDidMount() {
    this.props.onGetArticle(parseInt(this.props.match.params.id));
    this.props.onGetComments(parseInt(this.props.match.params.id));
  }

  clickConfirmCreateCommentHandler = (com) => {
    this.props.onStoreComment(
      parseInt(this.props.match.params.id),
      this.state.author_id,
      this.state.newcomment
    );
  };
  clickEditCommentHandler = (com) => {
    console.log(com);
    var inputString = prompt("edit comment", com.content);
    if (inputString !== "") {
      this.props.onEditComment(
        com.com_id,
        parseInt(this.props.match.params.id),
        com.author,
        inputString
      );
    }
  };
  clickDeleteCommentHandler = (id) => {
    this.props.onDeleteComment(id);
  };

  clickEditArticleHandler = (id) => {
    this.props.history.push("/articles/" + id + "/edit");
  };

  clickDeleteArticleHandler = () => {
    this.props.onDeleteArticle();
    this.props.history.push("/articles");
  };

  clickBackDetailArticleHander = () => {
    this.props.history.push("/articles");
  };

  render() {
    let title = "";
    let content = "";
    let author = "";
    let id = "";
    let author_id = "";
    if (this.props.selectedArticle) {
      title = this.props.selectedArticle.title;
      content = this.props.selectedArticle.content;
      id = this.props.selectedArticle.id;
      author_id = this.props.selectedArticle.author_id;
      if (this.props.selectedArticle.author_id === 1) {
        author = "Software Lover";
      } else if (this.props.selectedArticle.author_id === 2) {
        author = "Alan Turing";
      } else {
        author = "Edsger Dijkstra";
      }
    }
    let comments = "";
    if (this.props.allComments && id) {
      comments = this.props.allComments
        .filter((com) => {
          return com.article_id === id;
        })
        .map((com) => {
          return (
            <Comment
              content={com.content}
              author={com.author_id}
              com_id={com.id}
              clickDeleteComment={this.clickDeleteCommentHandler}
              clickEditComment={this.clickEditCommentHandler}
            />
          );
        });
    }

    return (
      <div className="ArticleDetail">
        <div>author:{author} </div>
        <div>title:{title} </div>
        <div>content:{content}</div>
        <input
          id="new-comment-content-input"
          type="text"
          onChange={(event) =>
            this.setState({ newcomment: event.target.value })
          }
        ></input>
        <button
          id="confirm-create-comment-button"
          onClick={() => this.clickConfirmCreateCommentHandler()}
          disabled={this.state.newcomment === ""}
        >
          confirm create comment
        </button>

        {author_id === 1 && (
          <button
            id="edit-article-button"
            onClick={() => this.clickEditArticleHandler(id)}
          >
            edit article
          </button>
        )}
        {author_id === 1 && (
          <button
            id="delete-article-button"
            onClick={() => this.clickDeleteArticleHandler()}
          >
            delete article
          </button>
        )}
        <button
          id="back-detail-article-button"
          onClick={() => this.clickBackDetailArticleHander()}
        >
          back detail article
        </button>
        {comments}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selectedArticle: state.ar.selectedArticle,
    allComments: state.com.comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
    onDeleteArticle: (id) => dispatch(actionCreators.deleteArticle(id)),
    onGetComments: (id) => dispatch(actionCreators.getComments(id)),
    onDeleteComment: (id) => dispatch(actionCreators.deleteComment(id)),
    onEditComment: (id, article_id, author_id, content) =>
      dispatch(
        actionCreators.editComment({
          id: id,
          article_id: article_id,
          author_id: author_id,
          content: content,
        })
      ),
    onStoreComment: (article_id, author_id, content) =>
      dispatch(
        actionCreators.postComment({
          article_id: article_id,
          author_id: 1,
          content: content,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
