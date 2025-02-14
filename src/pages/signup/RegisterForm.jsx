import React from "react";
import { Link } from "react-router-dom";


const RegisterForm = () => {

  return (
    <form className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl text-white mb-6 font-bold font-arsenal-sc-regular">
          Create An Account
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-white font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-2 focus:ring-black focus:border-black transition-colors"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-2 focus:ring-black focus:border-black transition-colors"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-white font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-2 focus:ring-black focus:border-black transition-colors"
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-2 focus:ring-black focus:border-black transition-colors"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-900 text-white mt-2 py-3 px-4 rounded-sm font-bold hover:bg-red-800 transition-colors"
        >
          Sign Up
        </button>

        <div className="text-center text-sm text-white">
          Already have an account?{" "}
          <Link 
            to="/" 
            className="font-semibold text-white hover:text-gray-200 transition-colors"
          >
            login to account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;