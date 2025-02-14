import React, { useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';


const Sidebar = ({ isOpen }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={`bg-[#ffffff] text-black w-64 border border-r-slate-300 h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-center p-4 ">
        <Link to="/admin/dashboard" className="text-xl font-rubik-wet-paint">
          DevFlow Admin
        </Link>
      </div>
      <ul className="mt-10 space-y-[1px]">
        <li className="mb-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `gap-x-4 font-semibold block py-3 px-5 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-200 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            <AiOutlineDashboard className="text-xl" />
            Dashboard
          </NavLink>
        </li>

        <li className="">
          <NavLink
            to=""
            className={({ isActive }) =>
              `gap-x-4 font-normal block py-3 px-5 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-200 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            {/* <FaUsersLine className="text-xl" /> */}
            vedios
          </NavLink>
        </li>

        <li className="">
          <NavLink
            to=""
            className={({ isActive }) =>
              `gap-x-4 font-normal block py-3 px-5 hover:bg-blue-100 flex items-center space-x-2 ${
                isActive ? "bg-blue-200 text-blue-900 border-r-2 border-r-blue-900" : ""
              }`
            }
          >
            {/* <FaUsersLine className="text-xl" /> */}
            Images
          </NavLink>
        </li>
      </ul>

      {/* Inline Styles for Arrows */}
      <style>{`
        .child-active {
          position: relative;
        }
        .child-active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -10px; /* Adjust to align with parent arrow */
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid #1e40af; /* Arrowhead color */
        }
      `}</style>
    </div>
  )
}

export default Sidebar
