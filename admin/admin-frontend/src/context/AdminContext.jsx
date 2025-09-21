import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const adminDataContext = createContext();

function AdminContext({ children }) {
  let [adminData, setadminData] = useState(null);
  let { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/getAdmin", {
        withCredentials: true,
      });
      setadminData(result.data);
      console.log("Admin data from context:", result.data);
    } catch (error) {
        console.log("Error fetching admin data:", error);
        setadminData(null);
    }
  };

  useEffect(() => {
    getAdmin();
  }, [])
  

  let value = { serverUrl, adminData, setadminData, getAdmin };

  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
    </div>
  );
}

export default AdminContext;
