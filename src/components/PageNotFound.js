import { Link } from "react-router-dom";
import style from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={style.notFound}>
      <h2>Sorry</h2>
      <p>We couldn't handle your request</p>
      <Link to="/"> Back to the homepage...</Link>
    </div>
  );
};

export default PageNotFound;
