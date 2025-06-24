import { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const restaurantInfoCard = resInfo?.cards?.find(
    (card) => card?.card?.card?.info
  );

  const {
    name = "Unknown Restaurant",
    cuisines = [],
    costForTwoMessage = "N/A",
    areaName = "Unknown Area"
  } = restaurantInfoCard?.card?.card?.info || {};

  const categories = resInfo?.cards
    ?.find((card) => card?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="text-center mt-25">
      <div>
        <h1 className="font-bold text-2xl">{name}</h1>
        <p>{cuisines.join(",")}</p>
        <p>{areaName}</p>
      </div>

      <div>
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category.card.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
