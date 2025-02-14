import React, { useRef, useState } from 'react'
import { AiOutlineMenuFold } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
// import profile_pic from '../../assets/images/';



const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

  return (
    <div
      className={`bg-[#ffffff] border border-b-slate-300 p-1 flex justify-between items-center transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      <button
        onClick={onToggleSidebar}
        className="bg-slate-200 p-1 hover:bg-gray-300 rounded-sm"
      >
        <AiOutlineMenuFold className="text-black hover:text-gray-700 text-xl font-thin" />
      </button>

      <div className="flex items-center space-x-4 mr-4 z-10" ref={ dropdownRef } >
        <div className="rounded-full" onClick={toggleDropdown}>
          <img
            src={" "}
            alt="profile image"
            style={{ height: "45px" }}
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute top-12 right-1 mt-2 w-52 p-2 bg-white border border-gray-200 rounded-sm shadow-md">
            <div className=" flex justify-start items-center border-b-[2px]">
                <img src={" "} alt="pro-img" style={{ height:"50px" }}/>
                <p className="text-sm">{ `DevFlow username` }</p>
            </div>
            <button
            //   onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              <MdLogout className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



export default Navbar
