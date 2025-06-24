import { useState,useEffect } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {

    const [resInfo,setresInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    },[]);
    const fetchMenu = async () => {
        try {
            
            console.log("Fetching menu..."); 
    
            const response = await fetch(
             MENU_URL + resId+ "&catalog_qa=undefined&submitAction=ENTER"
            );
            
            console.log("Response received:", response); 
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json(); 

            console.log("Menu JSON:", json); 

            // Ensure json.response exists before updating state
            if (json?.data) {
                setresInfo(json.data);
            } else {
                console.error("Menu data is missing:", json);
            }
    
        } catch (error) {
            console.error("Error fetching menu:", error); 
        }
    };


    return resInfo;

}

export default useRestaurantMenu;