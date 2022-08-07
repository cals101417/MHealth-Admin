import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import { Fail } from "./Fail";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  return (
    <div className="flex items-center min-h-screen p-4 lg:justify-center bg-gray-900">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-lg">
        <div className="p-5 py-6 text-white bg-header-color md:w-96 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-3xl font-bold tracking-wider text-center">
            <a href="index">
              <img src="img/logo.png" className="w-28 mx-auto" alt="" />
            </a>
            <h1 className="py-2 text-lg mt-4 text-purple-200">
              JOYOUS JOURNEY TOGETHER
            </h1>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Hello, Admin! Take care of your patients while they wait for you!
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Made by: M-Health
          </p>
        </div>
        <div className="p-12 pb-20 px-20 bg-gray-50 md:flex-1">
          <h3 className="my-6 pb-6 text-center text-2xl font-bold text-gray-700">
            Administrator Login
          </h3>
          {error && <Fail message={error} />}
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-900">
                Email address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                className="px-4 py-2 transition duration-300 border text-gray-900  border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                className="px-4 py-2 transition duration-300 border text-gray-900 border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-5">
            <h1 className="mt-2">
              <Link to="/ForgotPassword">Forgot Password?</Link>
            </h1>
            <div className="w-full flex items-center justify-between py-6">
              <hr className="w-full bg-gray-400" />
              <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                OR
              </p>
              <hr className="w-full bg-gray-400" />
            </div>
            <div className="flex flex-col">
              <p className="focus:outline-none text-sm font-medium leading-none ">
                Dont have account?{" "}
                <Link
                  to="/Signup"
                  className="
             focus:outline-none text-blue-700 focus:underline hover:underline text-sm font-medium
              leading-none cursor-pointer"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
