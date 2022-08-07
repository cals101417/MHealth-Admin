import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import { Fail } from "./Fail";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export function Signup() {
  const { signup } = useAuth();
  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    title: "",
    email: "",
    password: "",
    confirmpassowrd: "",
  });
  const userCollectionRef = collection(db, "admins");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmpassowrd) {
      return setError("Passwords do not match");
    }
    setError("");
    try {
      await signup(user.email, user.password);
      await addDoc(userCollectionRef, {
        lastname: user.lastname,
        firstname: user.firstname,
        title: user.title,
        email: user.email,
        password: user.password,
      });
      navigate("/Login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-12 justify-center bg-gray-900">
      <div className="flex flex-col overflow-hidden bg-white rounded py-8 shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md ">
        <div className="px-12 py-4 bg-white md:flex-1">
          <img src="img/logo.png" className="w-28  mx-auto" />
          <h3 className="text-2xl font-bold text-gray-700 pb-8 py-4 text-center">
            Create Administrator Account
          </h3>
          {error && <Fail message={error} />}
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <div class="flex gap-8">
              <div class="flex-col space-y-1">
                <label for="cnum" class="text-sm font-semibold text-gray-500">
                  Lastname
                </label>
                <input
                  type="text"
                  id="cnum"
                  name="cnum"
                  class="transition duration-300 border border-gray-300 rounded focus:border-transparent
                         focus:outline-none focus:ring-4 focus:ring-blue-200 text-gray-800 w-56 py-3 pl-3 mt-2"
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                />
              </div>
              <div class="flex-col space-y-1">
                <label
                  for="guardiannum"
                  class="text-sm font-semibold text-gray-500"
                >
                  Firstname
                </label>
                <input
                  type="text"
                  id="guardiannum"
                  name="guardiannum"
                  class="transition duration-300 border border-gray-300 rounded focus:border-transparent
                         focus:outline-none focus:ring-4 focus:ring-blue-200  w-56 text-gray-800 py-3 pl-3 mt-2"
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                />
              </div>
              <div class="flex-col space-y-1">
                <label class="text-sm font-semibold text-gray-500">Title</label>
                <select
                  id="Gender"
                  name="gender"
                  class="transition duration-300 border border-gray-300 rounded focus:border-transparent
                         focus:outline-none focus:ring-4 focus:ring-blue-200  w-40 text-gray-800 py-3 pl-3 mt-2"
                  onChange={(e) => setUser({ ...user, title: e.target.value })}
                  placeholder="Choose a Title"
                >
                  <option value=""></option>
                  <option value="Psychologist">Psychologist</option>
                  <option value="Psychometrician">Psychometrician</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-500">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="transition duration-300 border border-gray-300 rounded focus:border-transparent
                 focus:outline-none focus:ring-4 focus:ring-blue-200 px-36 text-gray-800 w-full py-3 pl-3 mt-2"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-500">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="transition duration-300 border border-gray-300 rounded focus:border-transparent
                 focus:outline-none focus:ring-4 focus:ring-blue-200 px-36 text-gray-800 w-full py-3 pl-3 mt-2"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-500">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="password"
                onChange={(e) =>
                  setUser({ ...user, confirmpassowrd: e.target.value })
                }
                className="transition duration-300 border border-gray-300 rounded focus:border-transparent
                 focus:outline-none focus:ring-4 focus:ring-blue-200 px-36 text-gray-800 w-full py-3 pl-3 mt-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 mt-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-5">
            <div className="w-full flex items-center justify-between py-6">
              <hr className="w-full bg-gray-400" />
              <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                OR
              </p>
              <hr className="w-full bg-gray-400  " />
            </div>
            <div className="flex flex-col space-y-4">
              <p className="focus:outline-none text-sm font-medium leading-none ">
                Already have an account?{" "}
                <Link
                  to="/Login"
                  className="
     focus:outline-none text-blue-700 focus:underline hover:underline text-sm font-medium
      leading-none cursor-pointer"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
