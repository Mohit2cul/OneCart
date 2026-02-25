import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const userDataContext = createContext();
function UserContext({ children }) {
  const [userData, setuserData] = useState(null);
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/auth/getCurrentUser",
        { withCredentials: true }
      )
      console.log("User logged in:", result.data);
      setuserData(result.data);
    } catch (error) {
      console.log("No user logged in - Error status:", error.response?.status);
      setuserData(null);  
    }
  };

  useEffect(() => {
    console.log("UserContext - Checking for existing user session");
    getCurrentUser();
  }, [serverUrl]);
  
  let value = {
    userData,
    setuserData,
    getCurrentUser
  };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
