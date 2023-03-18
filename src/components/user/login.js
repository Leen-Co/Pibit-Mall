import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit} className="col s12 m6 offset-m3">
        <h4 className="center-align">Login</h4>
        {error && (
          <div className="card-panel red lighten-4">
            <span className="red-text">{error}</span>
          </div>
        )}
        <div className="input-field">
          <input
            id="email"
            type="email"
            className="validate"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field">
          <input
            id="password"
            type="password"
            className="validate"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
