import { BsCurrencyRupee } from "react-icons/bs";
import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "../utils/cartSlice";
import toast from "react-hot-toast";

const ItemList = ({ items, showAddButton = true, showQuantityControls = false }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  console.log(items);

  const handleAddItems = (item) => {
    const itemId = item?.card?.info?.id;

    const existingCartItem = cartItems.find(
      (cartItem) => cartItem?.card?.info?.id === itemId
    );

    if (existingCartItem) {
      // If already in cart, increase quantity
      dispatch(addToCart(item));
      toast.success(`Increased quantity of ${item?.card?.info?.name}`);
    } else {
      // Add new item
      dispatch(addToCart(item));
      toast.success(`${item?.card?.info?.name} added to cart!`);
    }
  };

  const handleDecreaseItems = (item) => {
    dispatch(decreaseQuantity(item));
    toast(`${item?.card?.info?.name} quantity updated`);
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
    toast.success(`${item?.card?.info?.name} removed from cart!`);
  };

  return (
    <div>
      {items?.map((item, index) => {
        const itemId = item?.card?.info?.id;
        const quantity =
          cartItems.find((i) => i.card.info.id === itemId)?.quantity || 0;

        return (
          <div
            data-testid="foodmenu"
            key={`${itemId}-${index}`}
            className="p-2 m-2 border-grey-50 border-b-2 text-left flex justify-between"
          >
            <div className="w-9/12">
              <div className="py-2">
                <span>{item?.card?.info?.name}</span>
                <span>
                  <BsCurrencyRupee className="inline-flex items-center" />
                  {(item?.card?.info?.price ?? item?.card?.info?.defaultPrice ?? 0) / 100}
                </span>
              </div>
              <p className="text-gray-600 text-xs">
                {item?.card?.info?.description}
              </p>
            </div>

            <div className="w-3/12 p-2 relative">
              {showAddButton && (
                <div className="absolute">
                  <button
                    className="p-1 shadow-lg rounded-lg bg-white"
                    onClick={() => handleAddItems(item)}
                  >
                    Add +
                  </button>
                </div>
              )}

              {showQuantityControls && (
                <div className="absolute flex gap-2 items-center bg-white p-1 rounded-lg shadow-md">
                  {quantity > 1 ? (
                    <button
                      onClick={() => handleDecreaseItems(item)}
                      className="px-2 text-lg bg-gray-200 rounded"
                    >
                      −
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="px-2 text-lg bg-red-500 text-white rounded"
                    >
                      ×
                    </button>
                  )}
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleAddItems(item)}
                    className="px-2 text-lg bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              )}

              <img
                src={CDN_URL + item?.card?.info?.imageId}
                className="w-full h-25"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
