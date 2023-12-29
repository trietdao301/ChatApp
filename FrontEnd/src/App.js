import RootLayOut from "./components/layout/RootLayOut.js";
import Sell from "./page/Sell.js";
import Login from "./page/Login/Login.js";
import Register from "./page/Register/Register.js";
import Home from "./page/Home/Home.js";
import "./App.css";
import Market from "./components/Market.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Protected from "./Protected.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route element={<Protected />}>
          <Route path="market" element={<Market />} />
          <Route path="sell" element={<Sell />} />
          <Route path="home" element={<Home />} />
          <Route path="logout" element={<div>logout</div>} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
