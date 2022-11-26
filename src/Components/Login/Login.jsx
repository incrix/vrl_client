import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import VerifyAdmin from "../VerifyAdmin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [iserror, setIserror] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      VerifyAdmin().then((isValid) => {
        if (!isValid || isValid instanceof Error) {
          return
        }
        if(isValid){
          navigate("/");
        }
      });
    }
    
  }, [navigate]);

  const handleLogin = () => {
    const payload = {
      adminId: email,
      password,
    };

    fetch(`${global.config.ROOT_URL}login`,{
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        // 'Authorization': `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()).then((data) => {
        if (data.status === 201) {
          const token = data.data.token;
          if (token) {
            localStorage.setItem("token", token);
            navigate('/');
          }
        }
      })
      .catch(function (error) {
        setIserror(true);
        setError(error);
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
