import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { login } from "../../services/auth";

import api from "../../services/api";

import Logo from "../../logo.svg";

import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Airbnb logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Username"
            onChange={e => this.setState({ username: e.target.value })}
          />
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
          <button type="submit">SignUp for Free</button>
          <hr />
          <Link to="/">Login</Link>
        </Form>
      </Container>
    );
  }

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Fill all inputs to sign up" });
    } else {
      try {
        await api.post("/users", { username, email, password });
        const response = await api.post("/auth", { email, password });
        login(response.data.token);
        this.props.history.push("/main");
      } catch (err) {
        console.log(err);
        this.setState({ error: "An error ocurred" });
      }
    }
  };
}

export default withRouter(SignUp);