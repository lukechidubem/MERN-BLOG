import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import style from "./ProfilePage.module.css";

function ProfilePage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");

  const history = useNavigate();

  async function getUser() {
    try {
      const res = await fetch("https://lfcblog.onrender.com/profile", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      const jsonData = await res.json();

      setName(jsonData.data.username);
      setRole(jsonData.data.role);
      setGender(jsonData.data.gender);

      //   email.textContent = jsonData.data.email;
      //   name.textContent = jsonData.data.name;
      //   welcomeName.textContent = jsonData.data.name;
      //   phone.textContent = jsonData.data.phone;
    } catch (error) {
      console.log(error);
    }
  }

  getUser();

  return (
    <div className={style.profilePage}>
      <Navbar />
      <div className={style.profile}>
        <h2>Userame: {name}</h2>
        <h3>Role: {role}</h3>
        <h3>Gender: {gender}</h3>
      </div>
    </div>
  );
}

export default ProfilePage;
