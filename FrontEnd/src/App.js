import RootLayOut from "./components/layout/RootLayOut.js";
import Sell from "./page/Sell.js";
import Login from "./page/Login/Login.js";
import {useState} from "react";
import "./App.css";
import useFetch from "./hooks/useFetch.js";
import Market from "./components/Market.js"
import FlashMessage from "./components/FlashMessage.js"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path ="/" element = {<RootLayOut/>}>
            <Route path="/market" element={<Market/>}/>
            <Route path="sell" element={<Sell />} />
            <Route path="login" element={<Login />} />
    </Route>
  )
)

function App(){

    return(
      <RouterProvider router={router}/>
    );
}
export default App;
