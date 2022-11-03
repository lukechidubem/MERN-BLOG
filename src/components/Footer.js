import React from "react";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import style from "./Footer.module.css";
import Button from "../Button";

function Footer() {
  // const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      history("/");
    }, 1000);
  };

  return (
    <div className={style.footerContainer}>
      <h1 className={style.contact}>Contact Us</h1>
      <div className={style.formContainer}>
        {/* <!-- Subscribe Section --> */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Message</label>
            <textarea
              required
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          {!isPending && <Button>Send Message</Button>}
        </form>
      </div>

      <footer style={{ height: "100px" }}>
        {/* Copyright  */}
        <div
          style={{
            backgroundColor: "rgba(234, 227, 227, 0.2)",
            padding: "30px",
          }}
        >
          © 2022 Copyright:
          <Link to="/home" style={{ padding: "30px 0 30px 0" }}>
            LiverpoolFC News
          </Link>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  );
}

export default Footer;
