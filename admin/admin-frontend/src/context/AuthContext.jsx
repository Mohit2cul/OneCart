import React from 'react'
import { createContext } from 'react';
import { SERVER_URL } from '../../../../frontend/utils/constant';

export const authDataContext = createContext();

function AuthContext({children}) {
  let serverUrl = SERVER_URL;

  let value = {serverUrl}

  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext