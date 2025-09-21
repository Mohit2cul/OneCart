import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const userDataContext = createContext();
function UserContext({ children }) {
  const [userData, setuserData] = useState("");
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/auth/getCurrentUser",
        { withCredentials: true }
      )
      setuserData(result.data);
      console.log(result.data);
    } catch (error) {
      setuserData(null);  
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
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
