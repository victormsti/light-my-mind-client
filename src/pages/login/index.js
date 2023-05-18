import React, {useState} from "react";
import { Link, withRouter, useHistory } from "react-router-dom";


import Logo from "../../logo.svg";
import api from "../../services/api";
import { login, userId } from "../../services/auth";

import { Form, Container } from "./styles";

const SignIn = () => {
  const history = useHistory();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    error: ""
  });

  const handleSignIn = async e => {
    e.preventDefault();

    const { email, password } = loginForm;
    if (!email || !password) {
      setLoginForm({ ...loginForm, error: "Fill all inputs to continue" });
    } else {
      try {
        const response = await api.post("/auth", { email, password });
        login(response.data.token);
        userId(response.data.userId);

        history.push("/main");
      } catch (err) {
        setLoginForm({
          ...loginForm,
          error:
            'Invalid Login'
        });
      }
    }
  };

    return (
      <Container data-testid="login-container">
        <Form data-testid="login-form" onSubmit={handleSignIn}>
          <img src={Logo} alt="logo" />
          {loginForm.error && <p>{loginForm.error}</p>}
          <input
            type="email"
            placeholder="E-mail address"
            onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
          />
          <button type="submit">Login</button>
          <hr />
          <Link data-testid="login-link" to="/signup">SignUp for Free</Link>
        </Form>
      </Container>
    );
}

export default withRouter(SignIn);
