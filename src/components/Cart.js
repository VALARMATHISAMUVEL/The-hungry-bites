import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartItems);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item?.card?.info?.price || 0;
    const quantity = item?.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4 mt-8">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto mt-10">
        {cartItems.length === 0 ? (
          <>
            <h1 className="text-xl text-gray-500 font-semibold mb-6">
              Cart is empty.. Add items to enjoy a tasty meal!
            </h1>
            <Link to="/">
              <button className="bg-blue-600 text-white p-2 px-4 rounded-xl hover:bg-blue-700 transition">
                Continue Shopping
              </button>
            </Link>
          </>
        ) : (
          <>
            <ItemList
              items={cartItems}
              showAddButton={false}
              showQuantityControls={true}
            />
            <div className="flex justify-between bg-gray-100 p-4 rounded mt-4">
              <h2 className="text-xl font-semibold ml-5">Total Price:</h2>
              <h2 className="text-xl font-semibold mr-5">
                ₹ {totalPrice / 100}
              </h2>
            </div>
            <button
              className="bg-black text-white m-2 p-2 rounded-xl"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

