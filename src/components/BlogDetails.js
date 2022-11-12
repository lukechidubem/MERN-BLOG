import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Button from "../Button";
import Navbar from "./Navbar";

import style from "./BlogDetails.module.css";

const BlogDetails = () => {
  const { id } = useParams();

  const {
    data: blog,
    error,
    isPending,
  } = useFetch("https://lfcblog.onrender.com/blog/" + id);

  const history = useNavigate();

  const HandleChange = () => {
    const del = fetch("https://lfcblog.onrender.com/blog/" + blog._id, {
      method: "DELETE",
    }).then((err) => {
      console.log(err);
      history("/home");
    });
  };

  const HandleEdit = () => {
    fetch("https://lfcblog.onrender.com/blog/" + blog._id, {
      method: "PUT",
    }).then(() => {
      history("/home");
    });
  };

  //=========================================

  const [role, setRole] = useState("");

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
  return (
    <div>
      <Navbar />
      <div className={style.blogDetails}>
        {isPending && <div>Loading ... </div>}
        {error && <div>{error}</div>}
        {blog && (
          <article>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <img
              src={"https://lfcblog.onrender.com/" + blog.image.data}
              width="200px"
            />
            {/* <img src="/macbook-pro-13_bg.jpg" width="200px" /> */}

            <div className={style.body}> {blog.body}</div>
            <div className={role == "User" ? style.hide : style.btnContainer}>
              <button onClick={() => HandleChange()}>Delete</button>
              <button onClick={HandleEdit}>Edit</button>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
