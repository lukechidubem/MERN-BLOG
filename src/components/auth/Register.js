import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import style from "./auth.module.css";

const USER_REGEX = /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:[._][a-zA-Z\d])*)+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);

    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);

    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    console.log(v1, v2);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",

        body: JSON.stringify({ username: user, password: pwd }),

        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const data = await response.json();
      if (!data.status) {
        return setErrMsg(data.message);
      }

      setSuccess(true);
      // clear input fields
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className={style.sectionContainer}>
        {success ? (
          <section>
            <h1>Success!</h1>
            <p>
              <Link to="/login">Log In</Link>
              {/* <a href="#">Sign In</a> */}
            </p>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? style.errmsg : style.offscreen}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <span className={validName ? style.valid : style.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validName || !user ? style.hide : style.invalid}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />

              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? style.instructions
                    : style.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label htmlFor="password">
                Password:
                <span className={validPwd ? style.valid : style.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? style.hide : style.invalid}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd ? style.instructions : style.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                7 to 24 characters.
                <br />
                Must include upperCase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>
                <span aria-label="doller sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <span
                  className={validMatch && matchPwd ? style.valid : style.hide}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validMatch || !matchPwd ? style.hide : style.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? style.instructions
                    : style.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </form>

            <p>
              {" "}
              Already registered? <br />
              <span className={style.line}>
                <Link to="/login">Log In</Link>
              </span>
            </p>
          </section>
        )}
      </div>
    </>
  );
};

export default Register;
