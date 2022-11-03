import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    Navigate({ to: "/login" })
  );
}
