import { Link } from "react-router-dom";
import Card from "./Card";
import style from "./BlogList.module.css";

const BlogList = ({ blogs, title, handleDelete }) => {
  return (
    <div className={style.blogPreview}>
      <h1 className={style.headTitle}>{title}</h1>
      <div className={style.cardsContainer}>
        {blogs.data.map((blog) => {
          return (
            <Card
              pic={"http://localhost:8000/" + blog.image.data}
              title={blog.title}
              author={blog.author}
              id={blog._id}
              key={blog._id}
              date={blog.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
