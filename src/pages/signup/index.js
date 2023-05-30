import React, {useState} from "react";
import {Link, useHistory, withRouter} from "react-router-dom";
import {login, userId} from "../../services/auth";
import api from "../../services/api";
import Logo from "../../logo.svg";
import { Form, Container } from "./styles";

const SignUp = () => {
  const history = useHistory();

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    error: ""
  });

  const handleSignUp = async e => {
    e.preventDefault();

    const { username, email, password } = signupForm;
    if (!username || !email || !password) {
      setSignupForm({...signupForm, error: "Fill all inputs to sign up" });
    } else {
      try {
        await api.post("/users", { username, email, password });
        const response = await api.post("/auth", { email, password });
        login(response.data.token);
        userId(response.data.userId);

        history.push("/main");
      } catch (err) {
        console.log(err)
        setSignupForm({...signupForm, error: "An error occurred" });
      }
    }
  };

    return (
      <Container data-testid="signup-container">
        <Form onSubmit={handleSignUp} data-testid="signup-form">
          <img src={Logo} alt="Airbnb logo" />
          {signupForm.error && <p data-testid="signup-error-msg">{signupForm.error}</p>}
          <input
            type="text"
            placeholder="Username"
            data-testid="signup-input-username"
            onChange={e => setSignupForm({...signupForm, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail address"
            data-testid="signup-input-email"
            onChange={e => setSignupForm({...signupForm, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            data-testid="signup-input-password"
            onChange={e => setSignupForm({...signupForm, password: e.target.value })}
          />
          <button type="submit">SignUp for Free</button>
          <hr />
          <Link to="/" data-testid="signup-link">Login</Link>
        </Form>
      </Container>
    );
}

export default withRouter(SignUp);
