import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../logo.svg";
import api from "../../services/api";
import { login, userId } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Fill all inputs to continue" });
    } else {
      try {
        const response = await api.post("/auth", { email, password });
        login(response.data.token);
        userId(response.data.userId);
        this.props.history.push("/main");
        window.location.reload(false);
      } catch (err) {
        this.setState({
          error:
            'Invalid Login'
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="E-mail address"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Login</button>
          <hr />
          <Link to="/signup">SignUp for Free</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);