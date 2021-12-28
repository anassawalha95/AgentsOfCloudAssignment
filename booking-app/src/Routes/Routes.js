import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Components/BaseComponents/Home";
import Buyers from "../Components/BaseComponents/Buyers";
import Sellers from "../Components/BaseComponents/Sellers";
import Navbar from "../Components/ChildComponents/Navbar";
import Signup from "../Components/BaseComponents/Signup";
import Login from "../Components/BaseComponents/Login";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function CreateRoutes() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route index path="/Home" element={<Home />} />
        {cookies.get("roleType") == "seller" && (
          <Route exact path="/Buyers" element={<Sellers />} />
        )}
        {cookies.get("roleType") == "buyer" && (
          <Route exact path="/Sellers" element={<Buyers />} />
        )}
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CreateRoutes;
