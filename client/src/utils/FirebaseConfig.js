import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyVDGoA0uNhdWMxdgS7pUXNGNFn9PLJow",
  authDomain: "whisper-432.firebaseapp.com",
  projectId: "whisper-432",
  storageBucket: "whisper-432.appspot.com",
  messagingSenderId: "958930437553",
  appId: "1:958930437553:web:b415d7b69d1fabfc542990",
  measurementId: "G-GW21R5MDYY",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);