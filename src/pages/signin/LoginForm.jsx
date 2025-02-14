import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validations/user/loginValidation";
import { loginUser } from "../../services/authServices";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";



const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try{
      const response = await loginUser(data);
      dispatch(login(response.data.user));
      toast.success(response?.message || "Login successful!");
      navigate("/home");
    }catch(error) {
      toast.error(error.message);
      console.log("Login Error: ", error);
    }
  };

  return (
    <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <h2 className="text-3xl text-white mb-6 font-bold font-arsenal-sc-regular">
          Login To Your Account
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-2 focus:ring-black focus:border-black transition-colors bg-transparent"
            placeholder="Enter your email"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-white focus:ring-2 focus:ring-black focus:border-black transition-colors bg-transparent"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-900 text-white py-3 px-4 rounded-sm font-bold hover:bg-red-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="text-center text-sm text-white">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-white hover:text-gray-200 transition-colors"
          >
            Create account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;