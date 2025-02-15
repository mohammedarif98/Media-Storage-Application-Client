import React, { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { IoListOutline } from "react-icons/io5";
import { GrBlog } from "react-icons/gr";



const Sidebar = ({ isOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={`bg-[#ffffff] text-black w-64 border border-r-slate-300 h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-center p-4">
        <Link to="/home" className="text-xl font-bold capitalize">
          Media Storage
        </Link>
      </div>
      <ul className="mt-10 space-y-[1px]">
        <li className="mb-4">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `gap-x-4 font-semibold block py-3 px-5 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive
                  ? "bg-blue-200 text-blue-900 border-r-2 border-r-blue-900"
                  : ""
              }`
            }
          >
            <AiOutlineDashboard className="text-xl" />
            Dashboard
          </NavLink>
        </li>

        <li>
          <div
            className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-blue-100 hover:border-r-2 hover:border-r-blue-900"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-x-4">
              <GrBlog className="text-xl" />
              <span>Media Collection</span>
            </div>
            {isDropdownOpen ? (
              <MdKeyboardArrowUp className="text-lg" />
            ) : (
              <MdKeyboardArrowDown className="text-lg" />
            )}
          </div>

          {/* Dropdown Items */}
          {isDropdownOpen && (
            <ul className="ml-8 space-y-1 px-5">
              <li>
                <NavLink
                  to="/image-collection"
                  className={({ isActive }) =>
                    `flex py-2 px-3 hover:bg-blue-100 gap-x-2 justify-start items-center relative ${
                      isActive
                        ? "bg-blue-100 text-blue-900 border-l-2 border-l-blue-900 child-active"
                        : ""
                    }`
                  }
                >
                  <IoListOutline className="text-xl text-black" />
                  Image
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vedio-collection"
                  className={({ isActive }) =>
                    `flex py-2 px-3 hover:bg-blue-100 gap-x-2 justify-start items-center relative ${
                      isActive
                        ? "bg-blue-100 text-blue-900 border-l-2 border-l-blue-900 child-active"
                        : ""
                    }`
                  }
                >
                  <IoListOutline className="text-xl text-black" />
                  Video
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Inline Styles for Active Indicator */}
      <style>{`
        .child-active {
          position: relative;
        }
        .child-active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -10px;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid #1e40af;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
