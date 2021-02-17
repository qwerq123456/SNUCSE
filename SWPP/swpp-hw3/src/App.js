import React from "react";
import "./App.css";

import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Login from "./Login/Login";
import ArticleList from "./containers/ArticleList";
import WriteArticle from "./containers/WriteArticle/WriteArticle";
import EditArticles from "./containers/EditArticles/EditArticles";
import ArticleDetail from "./components/ArticleDetail/ArticleDetail";

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/articles" exact component={ArticleList}></Route>
          <Route path="/articles/create" exact component={WriteArticle}></Route>
          <Route path="/articles/:id" exact component={ArticleDetail}></Route>
          <Route
            path="/articles/:id/edit"
            exact
            component={EditArticles}
          ></Route>
          <Redirect exact from="/" to="/login" />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}
export default App;

/*import React, { Component } from "react";
import "./App.css";

import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { VpnKey, TagFaces, Home } from "@material-ui/icons";

const styles = (theme) => ({
  margin: { margin: theme.spacing.unit * 2 },
  padding: { padding: theme.spacing.unit },
});

class LoginTab extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <Grid container justify="center" style={{ marginTop: "10px" }}>
            <Home />
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              {" "}
              <TagFaces />{" "}
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="email"
                label="email"
                type="email"
                fullWidth
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <VpnKey />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="Password"
                type="password"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Button
                disableFocusRipple
                disableRipple
                style={{ textTransform: "none" }}
                variant="text"
                color="secondary"
              >
                Forgot password?
              </Button>
              <Button
                disableFocusRipple
                disableRipple
                style={{ textTransform: "none" }}
                variant="text"
                color="primary"
              >
                Create account
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: "10px" }}>
            <Grid item>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="로봇이 아닙니다."
              />
              <Button
                disableFocusRipple
                disableRipple
                style={{ textTransform: "none" }}
                variant="text"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </div>{" "}
      </Paper>
    );
  }
}
export default withStyles(styles)(LoginTab);
*/
