import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

function login() {
  const router = useRouter();

  const [{userInfo, newUser}, dispatch] = useStateProvider();

  useEffect(() => {
    if(userInfo?.id && !newUser) router.push("/");
  },[userInfo, newUser]);

  const handleLogin = async() => {
    const provider = new GoogleAuthProvider();
    const { user: { displayName: name, email, photoUrl: profileImage }} = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        if(!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "",
            }
          });
          router.push("/onboarding");
        } else {
          const {id, name, email, profilePicture:profileImage, status} = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status,
            }
          });
          router.push("/");
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center bg-[#121212] h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whisper.svg" alt="whisper" width={300} height={300} />
        <h1 className="font-title text-6xl">Whisper</h1>
      </div>
      <button
        onClick={handleLogin}
        className="flex items-center justify-center gap-5 bg-search-input-container-background p-3 shadow-lg rounded-lg"
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl"> Login with Google</span>
      </button>
    </div>
  );
}

export default login;
