import React from "react";
import { signInWithPopup} from "firebase/auth";
import { auth, provider } from "../config/firebase"; // Adjust path if needed

export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(" User signed in:", user);
    alert(`Welcome, ${user.displayName}`);
    return user;
  } catch (error) {
    console.error(" Google Sign-In Error:", error);
    alert("Sign-in failed.");
    return null;
  }
};