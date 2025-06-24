import ItemList from "./ItemList";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {

  const handleAccordianBody = () => {
    console.log("clicked");
    setShowIndex();
  };

  return (
    <div>
      {/* Accordion Container */}
      <div className="w-7/12 mx-auto my-4 p-4 bg-grey-50 shadow-lg">
        {/* Accordion Header */}
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleAccordianBody}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>
            {showItems ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </div>

        {/* Accordion Body */}
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
