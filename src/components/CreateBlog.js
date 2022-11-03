import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import style from "./CreateBlog.module.css";
import Navbar from "./Navbar";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const [author, setAuthor] = useState("Dubem");
  const [isPending, setIsPending] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("title", title);
    formdata.append("body", body);
    formdata.append("author", author);

    setIsPending(true);

    axios
      .post("http://localhost:8000/blog", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setIsPending(false);
        //routing to home page after adding the blog
        history("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className={style.create}>
        <h2> Add a new Blog</h2>
        <form onSubmit={handleSubmit}>
          <label>Blog Title:</label>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Blog Body:</label>
          <textarea
            required
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>

          <label>Blog Author:</label>
          <select
            value={author}
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="dubem">Head Admin Dubem</option>
            <option value="User">Normal User</option>
          </select>

          <label>Upload Image:</label>
          <input
            type="file"
            required
            name="image"
            // value={image.data}
            onChange={(e) => setImage(e.target.files[0])}
          />

          {!isPending && <Button>Add Blog</Button>}
          {isPending && <Button disabled>Adding Blogs...</Button>}
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
