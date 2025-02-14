import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validations/user/registerValidation";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/authServices";
import toast from "react-hot-toast";


const RegisterForm = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });


  const onSubmit = async(data) => {
    try{
      const response = await registerUser(data);
      toast.success(response?.message || "Registration successful!");
      setTimeout(() => navigate("/"), 1500);
    }catch(error) {
      toast.error(error.message);
      console.log("Registration Error: ", error);
    }
  };

  return (
    <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            {...register("username")}
            type="text"
            id="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-1 focus:ring-black focus:border-black "
            placeholder="Enter your username"
            required
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-1 focus:ring-black focus:border-black "
            placeholder="Enter your email"
            required
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-white font-medium mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-1 focus:ring-black focus:border-black "
            placeholder="Enter your password"
            required
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-1 focus:ring-black focus:border-black "
            placeholder="Confirm your password"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-900 text-white mt-2 py-3 px-4 rounded-sm font-bold hover:bg-red-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SignUping..." : "Sign Up"}
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