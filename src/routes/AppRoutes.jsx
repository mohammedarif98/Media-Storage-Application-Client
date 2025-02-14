import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "../pages/signin/LoginPage";
import RegisterPage from "../pages/signup/RegisterPage";
import HomePage from "../pages/dashboard/HomePage";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";



const UserRoutes = () => {

  // const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const showNavbarAndSidebar = !location.pathname.startsWith('/admin/login') && !location.pathname.startsWith('/admin/*');


  return (
    <div className="flex flex-col min-h-[918px] bg-[#e7edff]">
      {/* {showNavbarAndSidebar && (
        <>
          <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`flex-1 p-6 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
              <Routes>
                <Route >
                  <Route path='/dashboard' element={<HomePage />}/>
                </Route>
              </Routes>
            </div>
          </div>
        </>
      )} */}

      {/* { !showNavbarAndSidebar &&( */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      {/* )} */}

    </div>
  );
};

export default UserRoutes;
