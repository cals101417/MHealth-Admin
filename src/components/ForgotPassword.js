import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../context/UserAuthContext";
import { Fail } from "./Fail";

export function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [user, setUser] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(user.email);
      setError("Check Your Inbox to Reset your Password");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div class="flex items-center min-h-screen lg:justify-center bg-gray-900">
      <div class="flex flex-col overflow-hidden bg-white rounded shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm">
        <div class="px-12 py-12 bg-white text-black md:flex-1">
          <h3 class="text-2xl font-bold pb-8 text-center">
            RESET YOUR PASSWORD
          </h3>
          {error && <Fail message={error} />}
          <form class="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div class="flex flex-col space-y-1">
              <label class="text-lg font-semibold">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                class="transition duration-300 border border-gray-300 rounded focus:border-transparent
                 focus:outline-none focus:ring-4 focus:ring-blue-200  w-full py-3 pl-3 mt-2"
              />
            </div>

            <div>
              <button
                type="submit"
                class="w-full px-4 py-3 mt-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Reset Password
              </button>
              <div class="pt-6"></div>
            </div>
          </form>
          <div class="flex flex-col space-y-5">
            <div class="w-full flex items-center justify-between py-2">
              <hr class="w-full bg-gray-400" />
              <p class="text-base font-medium leading-4 px-2.5 text-gray-400">
                OR
              </p>
              <hr class="w-full bg-gray-400" />
            </div>
            <div class="flex flex-col space-y-4">
              <p class="focus:outline-none text-sm font-medium leading-none ">
                Already have an account?
                <button
                  class="
     focus:outline-none text-blue-700  focus:underline hover:underline text-sm font-medium
      leading-none cursor-pointer"
                >
                  {" "}
                  <Link to="/">Go to Log in</Link>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
