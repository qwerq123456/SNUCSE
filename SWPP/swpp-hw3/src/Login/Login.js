import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    pw: "",
    isvalid: false,
  };
  clickLoginHandler = () => {
    const data = { email: this.state.email, pw: this.state.pw };
    if (data.email === "swpp@snu.ac.kr" && data.pw === "iluvswpp") {
      this.setState({ isvalid: true });
      this.props.history.push("/articles");
    }
    if (this.isvalid === false) {
      alert("Email or password is wrong");
    }
  };

  render() {
    if (this.isvalid === true) {
      return <Redirect to="/articles" />;
    }
    return (
      <div className="login">
        <h1>Login Page!</h1>
        <label>Email</label>
        <input
          type="text"
          id="email-input"
          value={this.state.email}
          onChange={(event) => this.setState({ email: event.target.value })}
        ></input>
        <label>PW</label>
        <input
          id="pw-input"
          type="text"
          value={this.state.pw}
          onChange={(event) => this.setState({ pw: event.target.value })}
        ></input>
        <button id="login-button" onClick={() => this.clickLoginHandler()}>
          Login
        </button>
      </div>
    );
  }
}
export default Login;
