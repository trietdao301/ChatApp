import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const RootLayOut = ({ name }) => {
  return (
    <div>
      <header>
        <Navbar name={name} />
      </header>

      <main>
        <Outlet />
        {/* Outlet is for rendering the children of Navbar.  */}
      </main>
    </div>
  );
};

export default RootLayOut;
