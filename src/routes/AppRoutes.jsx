import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "../pages/signin/LoginPage";
import RegisterPage from "../pages/signup/RegisterPage";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import DashBoardPage from "../pages/dashboard/DashBoardPage";



const UserRoutes = () => {

  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showNavbarAndSidebar = location.pathname.startsWith("/home");


  return (
    <div className="flex flex-col min-h-[918px] bg-[#e7edff]">
      {showNavbarAndSidebar && (
        <>
          <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} />
            <div
              className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "ml-64" : "ml-0"
              }`}
            >
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<DashBoardPage />} />
                </Route>
              </Routes>
            </div>
          </div>
        </>
      )}

      {!showNavbarAndSidebar && (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </div>
  );
};

export default UserRoutes;
