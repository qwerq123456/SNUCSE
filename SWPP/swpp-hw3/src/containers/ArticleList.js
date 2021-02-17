import React, { Component } from "react";
import Article from "../components/Article/Article";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

class ArticleList extends Component {
  componentDidMount() {
    this.props.onGetAll();
  }
  clickCreateHandler = () => {
    this.props.history.push("/articles/create");
  };
  clickTitleHandler = (id) => {
    this.props.history.push("/articles/" + id);
  };
  render() {
    let articles = "";
    if (this.props.storedArticles) {
      articles = this.props.storedArticles.map((ar) => {
        return (
          <Article
            id={ar.id}
            title={ar.title}
            author={ar.author_id}
            clickTitle={this.clickTitleHandler}
          />
        );
      });
    }
    return (
      <div className="ArticleList">
        {articles}
        <button
          id="create-article-button"
          onClick={() => this.clickCreateHandler()}
        >
          create article
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    storedArticles: state.ar.articles,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetAll: () => dispatch(actionCreators.getArticles()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArticleList));
