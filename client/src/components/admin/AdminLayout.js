import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Button } from "react-bootstrap";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.profile);
  return user.isAdmin ? (
    <div className="d-flex">
      <div style={{ width: "220px", borderRight: "1px solid" }}>
        <Sidebar />
      </div>
      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  ) : (
    <div className="text-center mt-3">
      <h1 className="mb-5">Admin Only</h1>
      <h2>Login as Admin</h2>
      <h4 className="mt-5 mb-2">email: admin@gmail.com</h4>
      <h4>password: admin</h4>
      <Link to={"/login"}>
        <Button className="mt-4">Login</Button>
      </Link>
    </div>
  );
};

export default AdminLayout;
