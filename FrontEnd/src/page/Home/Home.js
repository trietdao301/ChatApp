import Navbar from "../../components/Navbar.js";
import Sell from "./Sell.js";
import {useState, useEffect} from "react";
import "./Home.css";
import useFetch from "../../hooks/useFetch.js";
import DisplayAllProducts from "../../components/DisplayAllProducts.js"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

function Home(){
    const [url,setUrl] = useState({});
    const {data} = useFetch('http://172.23.30.165:5000');       //use fetch input = usefetch({url: 'link'})
    
    console.log("Home is running");
    return(
        <div className = "HomeContainer">
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<DisplayAllProducts products={data?.products || []} />}
            />
            <Route path="/sell" element={<Sell />} />
          </Routes>
        </Router>
      </div>
    );
}
export default Home;