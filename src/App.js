import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import BlogDetails from "./components/BlogDetails";
import CreateBlog from "./components/CreateBlog";
import PageNotFound from "./components/PageNotFound";
import LandingPage from "./components/auth/LandingPage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProfilePage from "./components/ProfilePage";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

function App() {
  const routes = [
    { path: "/home", name: "Home", element: <Home /> },
    { path: "/create", name: "CreateBlog", element: <CreateBlog /> },
    { path: "/profile", name: "ProfilePage", element: <ProfilePage /> },
    { path: "/blog/:id", name: "BlogDetails", element: <BlogDetails /> },
  ];

  return (
    <div className="content">
      {/* <Switch> */}
      <Routes>
        <Route element={<ProtectedRoutes />}>
          {routes.map((route, id) => {
            return (
              <Route
                key={id}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={
                  localStorage.getItem("token") ? route.element : <Login />
                }
              />
            );
          })}
        </Route>

        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
