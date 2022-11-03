import React from "react";
import { Link } from "react-router-dom";
import style from "./auth.module.css";

function LandingPage() {
  return (
    <div className={style.landingPage}>
      <button>
        <Link to="/register">REGISTER</Link>
      </button>
      <button>
        <Link to="/login">LOGIN</Link>
      </button>
    </div>
  );
}

export default LandingPage;
