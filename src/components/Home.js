import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import Navbar from "./Navbar";
import BlogList from "./BlogList";
import Footer from "./Footer";

import style from "./Home.module.css";

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("https://lfcblog.onrender.com/blog");

  return (
    <>
      <Navbar />
      <div className={style.home}>
        <div className={style.heroContainer}>
          <h1>Welcome to The Number One Liverpool News Blog,</h1>
          <h1>You'll Never Walk Alone</h1>
        </div>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {blogs && (
          <BlogList blogs={blogs} title="Most Recent Liverpool News!" />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
