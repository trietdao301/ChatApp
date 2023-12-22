import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from "react-router-dom";

const RootLayOut = () => {
  return (
    <div>
        <header>
            <Navbar/>
        </header>
        
        <main>
            <Outlet/>          {/* Outlet is for rendering the children of Navbar.  */}
        </main>
    </div>
  );
};

export default RootLayOut;