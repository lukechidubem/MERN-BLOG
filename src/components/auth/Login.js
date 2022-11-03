import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import style from "./auth.module.css";

const LOGIN_URL = "/auth";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post(
      //   LOGIN_URL,
      //   JSON.stringify({ user, pwd }),

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",

        body: JSON.stringify({ username: user, password: pwd }),

        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.json();
      console.log(data);
      // console.log(JSON.stringify(response));
      if (!data.status) {
        return setErrMsg(data.message);
      }
      const accessToken = data?.token;
      const role = data?.data?.role;
      const username = data?.data?.username;
      const password = data?.data?.password;

      localStorage.setItem("token", accessToken);

      console.log(accessToken);
      setAuth({ username, password, role, accessToken });
      setUser("");
      setPwd("");

      setSuccess(true);
      navigate("/home");
    } catch (err) {
      if (err?.data.status) {
        setErrMsg("No Server Response");
      } else if (!err.data?.status) {
        setErrMsg("Missing Username or Password");
      } else if (err.data?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      errRef.current.focus();
    }
  };

  return (
    <>
      <div className={style.sectionContainer}>
        <section>
          <p
            ref={errRef}
            className={errMsg ? style.errmsg : style.offscreen}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit} className={style.form}>
            <label htmlFor="username">Username:</label>
            <input
              className={style.input}
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              // required
            />

            <label htmlFor="password" className={style.label}>
              Password:
            </label>
            <input
              className={style.input}
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              // required
            />

            <button className={style.button}>Sign In</button>
          </form>

          <p>
            Need an Account? <br />
            <span className={style.line}>
              {/*put router link here*/}
              <Link to="/register">Sign Up</Link>
              {/* <a href="#">Sign Up</a> */}
            </span>
          </p>
        </section>
      </div>
    </>
  );
}

export default Login;
