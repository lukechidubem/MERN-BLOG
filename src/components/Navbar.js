import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [role, setRole] = useState("");
  const history = useNavigate();

  async function getUser() {
    try {
      const res = await fetch("https://lfcblog.onrender.com/profile", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      const jsonData = await res.json();

      setRole(jsonData.data.role);
    } catch (error) {
      console.log(error);
    }
  }

  getUser();

  function logoutHandler(e) {
    e.preventDefault();

    localStorage.removeItem("token");

    setTimeout(() => {
      history("/");
    }, 1000);
  }

  return (
    <nav className={style.navbar}>
      {/* <h1 >Luke's Blog</h1> */}
      <div className={style.logo}>
        <a href="#">
          <span>St</span>Luke
        </a>
      </div>
      <div className={style.links}>
        <Link to="/home">Home</Link>
        <Link className={role == "User" ? style.hide : style.show} to="/create">
          New Blog
        </Link>

        <Link to="/profile">Profile</Link>
        <Link to="/" onClick={logoutHandler}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
