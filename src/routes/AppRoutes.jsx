import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/signin/LoginPage";
import RegisterPage from "../pages/signup/RegisterPage";



const UserRoutes = () => {

  return (
    <div className="flex flex-col min-h-[918px] bg-[#e7edff]">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </div>
  );
};


export default UserRoutes;
