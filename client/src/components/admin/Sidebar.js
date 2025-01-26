import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <Link to="products">Products</Link>
      <br />
      <Link to="">Orders</Link>
    </div>
  );
};

export default Sidebar;
