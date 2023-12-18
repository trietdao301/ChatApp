import Navbar from "../../components/Navbar.js";
import {useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch.js";
function Home(){
    const [url,setUrl] = useState({});
    const {data} = useFetch(url);
    
    console.log("Home is running");
    return(
        <>
            <Navbar/>
            <div> {JSON.stringify(data)}</div>
            <button onClick={() => setUrl({url:"http://172.23.30.165:5000//index"})}>Button 1</button>
            <button onClick={() => setUrl({url:"http://172.23.30.165:5000//student"})}>Button 2</button>
        </> 
    );
}
export default Home;