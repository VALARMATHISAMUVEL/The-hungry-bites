import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { handleGoogleSignIn } from "../utils/authUtils";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const Header = () => {
  const [user, setUser] = useState(null);
  const OnlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.cartItems);

  const onSignInClick = async () => {
    const user = await handleGoogleSignIn();
    if (user) {
      setUser(user);
      console.log("User signed in from header:", user.displayName);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Sets user when signed in/out
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <div className="shadow-md w-full fixed left-0 top-0 right-0 h-20 z-10 md:px-5 text-color-1 bg-white px-3">
      <div className="flex justify-between items-center h-full container mx-auto">
        
        <div className="flex items-center md:gap-5 gap-2">
          <img
            className="ml-4 h-14 rounded-full border border-black"
            src={LOGO_URL}
          />
        </div>

        <div className="nav-items">
          <ul className="flex items-center md:gap-5 gap-4 font-bold">
            
            <li className="px-2 hover:text-orange-500 cursor-pointer">
              online status: {OnlineStatus ? "yes" : "no"}
            </li>

            <li className="px-2 hover:text-orange-500 cursor-pointer">
              <Link to="/">Home</Link>
            </li>

            {user ? (
              <div className="flex items-center gap-4">
                <li className="px-2 text-green-600 font-medium">
                  {user.displayName}
                </li>
                <button
                  onClick={() => signOut(auth)}
                  className="px-2 py-1 font-bold text-red-500 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="flex items-center gap-2 hover:text-orange-500 cursor-pointer"
              >
                Sign In
              </button>
            )}

            <li className="px-2 hover:text-orange-500 cursor-pointer">
              <Link to="/cart">Cart ({cartItems.length})</Link>
            </li>

          </ul>
        </div>

      </div>
    </div>
  );
};

export default Header;
