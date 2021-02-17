import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class EditArticle extends Component {
  state = {
    author: "",
    title: "",
    content: "",
    check: "Write",
  };

  componentDidMount = () => {
    this.props.onGetArticle(parseInt(this.props.match.params.id));
    if (this.props.selectedArticle) {
      this.setState({
        id: this.props.selectedArticle.id,
        author_id: this.props.selectedArticle.author_id,
        title: this.props.selectedArticle.title,
        content: this.props.selectedArticle.content,
      });
    }
  };

  clickBackEditHandler = () => {
    this.props.history.push("/articles");
  };
  clickConfirmEditHandler = (ar) => {
    this.props.onEditArticle(
      this.state.id,
      this.state.author_id,
      this.state.title,
      this.state.content
    );
    this.props.history.push("/articles/" + this.state.id);
  };
  clickPreviewTabHandler = () => {
    this.setState({ check: "Preview" });
  };
  clickWriteTabHandler = () => {
    this.setState({ check: "Write" });
  };
  render() {
    if (this.state.check === "Write") {
      return (
        <div className="WriteArticleWrite">
          <h1>Write</h1>
          <label>Title</label>
          <input
            id="article-title-input"
            type="text"
            value={this.state.title}
            onChange={(event) =>
              this.setState({
                id: "4",
                author: "Software Lover",
                title: event.target.value,
                author_id: 1,
              })
            }
          ></input>
          <label>Content</label>
          <input
            id="article-content-input"
            type="text"
            value={this.state.content}
            onChange={(event) => this.setState({ content: event.target.value })}
          ></input>
          <button
            id="back-edit-article-button"
            onClick={() => this.clickBackEditHandler()}
          >
            back edit article
          </button>
          <button
            id="confirm-edit-article-button"
            onClick={() => this.clickConfirmEditHandler()}
            disabled={this.state.title === "" || this.state.content === ""}
          >
            confirm edit article
          </button>
          <button
            id="preview-tab-button"
            onClick={() => this.clickPreviewTabHandler()}
          >
            preview tab
          </button>
          <button
            id="write-tab-button"
            onClick={() => this.clickWriteTabHandler()}
          >
            write tab
          </button>
        </div>
      );
    } else {
      return (
        <div className="WriteArticlePreview">
          <h1>Preview</h1>
          <h3 id="article-author">{this.state.author}</h3>
          <h3 id="article-title">{this.state.title}</h3>
          <h3 id="article-content">{this.state.content}</h3>
          <button
            id="back-edit-article-button"
            onClick={() => this.clickBackEditHandler()}
          >
            back edit article
          </button>
          <button
            id="confirm-edit-article-button"
            onClick={() => this.clickConfirmEditHandler()}
            disabled={this.state.title === "" || this.state.content === ""}
          >
            confirm edit article
          </button>
          <button
            id="preview-tab-button"
            onClick={() => this.clickPreviewTabHandler()}
          >
            preview tab
          </button>
          <button
            id="write-tab-button"
            onClick={() => this.clickWriteTabHandler()}
          >
            write tab
          </button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedArticle: state.ar.selectedArticle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditArticle: (id, author_id, title, content) =>
      dispatch(
        actionCreators.editArticle({
          id: id,
          author_id: author_id,
          title: title,
          content: content,
        })
      ),
    onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
