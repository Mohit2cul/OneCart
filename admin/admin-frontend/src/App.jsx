import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Add from "./pages/Add";
import List from "./pages/List";
import { adminDataContext } from "./context/AdminContext";
function App() {
  let adminData = useContext(adminDataContext);
  return (
    <>
      {!adminData ? (
        <Login />
      ) : ( 
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
