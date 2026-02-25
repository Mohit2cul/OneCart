import React, { createContext } from "react";
import { SERVER_URL } from "../../utils/constant";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = SERVER_URL;

  let value = {
    serverUrl,
  };
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
