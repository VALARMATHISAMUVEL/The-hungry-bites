import { MdStarRate } from "react-icons/md";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData = {} }) => {
  console.log("RestaurantCard received resData:", resData); // Debugging

  const {
    cloudinaryImageId = "",
    name = "unknown res",
    cuisines = [],
    areaName = "unknown area",
    avgRating = "N/A",
    sla = {},
    costForTwo = "N/A"
  } = resData || {};

  return (
    <div data-testid="rescard" className="flex flex-col gap-3 cursor-pointer">
      <div className="w-80 h-56 card relative rounded-xl">
        <img
          className="rounded-xl w-full h-full object-cover"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>

      <div className="ml-3">
        <h2 className="font-bold text-lg text-gray-700">
          {name.slice(0, 22)}
          {name.length > 22 ? "..." : ""}
        </h2>

        <div className="flex font-bold text-gray-700">
          <MdStarRate className="color-green" />

          <div className="font-GrotBold flex gap-1 text-color-3 -mt-1 ml-2">
            <span>{avgRating}</span>
            <div className="-mt-5 text-4xl">
              <span>.</span>
            </div>
            <span>{sla?.deliveryTime || "N/A"} mins</span>
            <h4>-{costForTwo / 100}</h4>
          </div>
        </div>

        <p className="text-gray-500 -mb-1">
          {cuisines.join(",").slice(0, 30)}
          {cuisines.join(",").length > 30 ? "..." : ""}
        </p>
        <p className="text-gray-500">{areaName}</p>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
