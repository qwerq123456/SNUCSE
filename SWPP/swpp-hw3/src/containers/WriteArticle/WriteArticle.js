import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class WriteArticles extends Component {
  state = {
    author: "",
    title: "",
    content: "",
    check: "Write",
  };
  clickBackCreateHandler = () => {
    this.props.history.push("/articles");
  };
  clickConfirmCreateHandler = (ar) => {
    this.props.onStoreArticle(
      this.state.author,
      this.state.author_id,
      this.state.title,
      this.state.content
    );
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
            id="back-create-article-button"
            onClick={() => this.clickBackCreateHandler()}
          >
            back create article
          </button>
          <button
            id="confirm-create-article-button"
            onClick={() => this.clickConfirmCreateHandler()}
            disabled={this.state.title === "" || this.state.content === ""}
          >
            confirm create article
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
            id="back-create-article-button"
            onClick={() => this.clickBackCreateHandler()}
          >
            back create article
          </button>
          <button
            id="confirm-create-article-button"
            onClick={() => this.clickConfirmCreateHandler()}
            disabled={this.state.title === "" || this.state.content === ""}
          >
            confirm create article
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
const mapDispatchToProps = (dispatch) => {
  return {
    onStoreArticle: (author, author_id, title, content) =>
      dispatch(
        actionCreators.postArticle({
          author: author,
          author_id: author_id,
          title: title,
          content: content,
        })
      ),
  };
};
export default connect(null, mapDispatchToProps)(WriteArticles);
