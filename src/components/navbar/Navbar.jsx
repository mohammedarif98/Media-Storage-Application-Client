import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import profile_pic from '../../assets/images/pngtree-man-avatar-image-for-profile-png-image_13001882.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authServices';
import toast from 'react-hot-toast';


const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Logout failed. Please try again.');
      console.error('Logout Error: ', error);
    }
  };

  return (
    <div
      className={`bg-[#ffffff] border border-b-slate-300 p-1 flex justify-between items-center transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}
    >
      <button
        onClick={onToggleSidebar}
        className="bg-slate-200 p-1 mx-2 hover:bg-gray-300 rounded-sm"
      >
        <AiOutlineMenuFold className="text-black hover:text-gray-700 text-xl font-thin" />
      </button>

      <div className="flex items-center space-x-4 mr-4 z-10" ref={dropdownRef}>
        <div className="rounded-full cursor-pointer" onClick={toggleDropdown}>
          <img
            src={profile_pic}
            alt="profile image"
            style={{ height: '45px' }}
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-12 right-1 mt-2 w-52 p-2 bg-white border border-gray-200 rounded-sm shadow-md">
            <div className="flex justify-center items-center border-b-[1px] pb-2">
              <p className="text-md capitalize font-semibold">{`${user?.username}`}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex justify-center items-center w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              <MdLogout className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default Navbar;