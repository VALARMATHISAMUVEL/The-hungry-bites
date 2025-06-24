import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.PARCEL_FIREBASE_API,
  authDomain: process.env.PARCEL_FIREBASE_AUTHDOMAIN,
  projectId: process.env.PARCEL_PROJECT_ID,
  storageBucket: process.env.PARCEL_STORAGE_BUCKET,
  messagingSenderId: process.env.PARCEL_MESS_SEND_ID,
  appId: process.env.PARCEL_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services you'll use
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };

