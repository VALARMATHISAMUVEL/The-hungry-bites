import { CiSearch } from "react-icons/ci";
import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useState,useEffect} from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import {Link} from "react-router-dom";

const Body = () => {

    const [listOfRes, setlistOfRes] = useState([]);
    const [filteredRestaurants,setfilteredRestaurants] = useState([]);

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    const [searchText,setsearchText] =useState("");
     useEffect( () => {
      fetchData();
     } ,[])
  
    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9715987&lng=77.5945627&str=South%20Indian&trackingId=66c6c98c-6a2f-6a43-85cb-37594c3234be&submitAction=ENTER&queryUniqueId=a8e5b311-ab07-3cbb-a4f0-92c5abc0f946"
            );
            const json = await response.json();
          
            // Extracting restaurant info safely
            const restaurants = json?.data?.cards
                ?.find(card => card?.groupedCard?.cardGroupMap?.RESTAURANT)
                ?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
                ?.map(item => item?.card?.card?.info) // Extract the `info` object
                ?.filter(restaurant => restaurant?.id); // Ensure valid restaurant objects
    
            // Update state with extracted data
            setlistOfRes(restaurants || []);
            setfilteredRestaurants(restaurants || []);
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const OnlineStatus = useOnlineStatus();

    if (OnlineStatus === false)
        return (
            <div className="flex items-center justify-center h-screen">
                <h1  className="text-xl font-semibold text-gray-700">Oops! It seems you're offline. Check your connection and try again.</h1>
            </div>  
        );  
    return listOfRes.length === 0 ? <Shimmer/> : (
        <div className="body mt-16">
            <div className="flex justify-center p-4">
                <div className="relative ">
                <input type="text" className=" shadow-md mt-6 pr-10 p-4 border border-gray rounded-md text-gray-400 font-bold" value={searchText} onChange={(e)=>{setsearchText(e.target.value);}} placeholder="Search for item.."/>
              <CiSearch className="mt-2 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer" onClick={()=>{
                const filteredRes = listOfRes.filter((res) => {
                return res.name.toLowerCase().includes(searchText.toLowerCase())
                }   
                );
                setfilteredRestaurants(filteredRes)
              }} />
                </div> 
            </div>
        <div className="flex gap-8 flex-wrap mt-10 justify-center">
        {console.log("Filtered Restaurants in Body:", filteredRestaurants)} 
        {filteredRestaurants.map((restaurant, index) => (
    <Link
    className="relative transition-all hover:scale-95"
    key={restaurant?.id}
    to={`/restaurants/${restaurant?.id}`}
  >
    {restaurant?.promoted ? (
      <RestaurantCardPromoted resData={restaurant} />
    ) : (
      <RestaurantCard resData={restaurant} />
    )}
  </Link>
)     
)}
</div>        
</div>
)
}

export default Body;