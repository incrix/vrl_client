import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [iserror, setIserror] = useState(false);
  console.log(email, password);
  let navigate = useNavigate();

  const handleLogin = () => {
    const payload = {
      adminId: email,
      password,
    };

    axios({
      method: "post",
      url: "http://localhost:5050/api/admin/login",
      data: payload,
      headers: {
        // 'Authorization': `bearer ${token}`,
        "Content-Type": "application/json",
      },
      json: true,
    })
      .then(function (response) {
        if (response.status === 201) {
          const token = response.data.data.token;
          if (token) {
            localStorage.setItem("token", token);
            navigate('/');
          }
        }
      })
      .catch(function (error) {
        setIserror(true);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="LoginSec">
      <div className="loginForm">
        <h4 className="loginTitle">Welcome!</h4>
        <div className="inputField">
          <input
            type="mail"
            autoComplete="true"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {iserror ? <p className="error">{error}</p> : ""}
        </div>
        <button className="login" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
