import { useState, useEffect } from "react";

const useFetch = (options) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log("useEffect");
        if(options.url){
            fetch(options.url)
            .then((response) => response.json())
            .then((json) => setData(json));
        }
        
    },[options.url]);

    return {data};
};

export default useFetch;