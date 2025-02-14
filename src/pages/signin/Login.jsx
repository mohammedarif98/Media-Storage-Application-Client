
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="bg-[#001F23] min-h-screen flex items-center justify-center p-4">
      <div className="p-8 flex flex-col md:flex-row items-center justify-center max-w-[1400px] w-full gap-8">
        {/* ------------Left Side------------ */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2">
          <p className="text-3xl lg:text-4xl text-white font-bold text-center font-rubik-wet-paint">
            Welcome To DevFlow
          </p>
        </div>

        <div className="hidden md:block h-96 w-px bg-white/50"></div>

        {/* ------------Right Side------------ */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;