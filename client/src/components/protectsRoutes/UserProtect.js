import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const UserProtect = () => {
  const { user } = useSelector((state) => state.profile);
  return user.name ? (
    <Outlet />
  ) : (
    <div className="text-center mt-3">
      <h1 className="mb-5">User Only</h1>
      <h2>Login as User</h2>
      <h4 className="mt-5 mb-2">email: user@gmail.com</h4>
      <h4>password: user</h4>
      <Link to={"/login"}>
        <Button className="mt-4">Login</Button>
      </Link>
    </div>
  );
};

export default UserProtect;
