import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [counselling, setCounselling] = useState(false);
  const [physcological, setPhsycological] = useState(false);
  const [seminar, setSeminar] = useState(false);

  return (
    <div className="flex">
      <div className="duration-300 w-72 p-5 pt-8 min-h-screen bg-header-color relative">
        <div className="flex items-center">
          <img
            src="img/logo.png"
            className={`cursor-pointer duration-500 w-16 p-4`}
          />
          <h1 className="text-white font-medium text-2xl duration-300">
            M-Health
          </h1>
        </div>

        <nav className="text-center text-white text-md py-12">
          <Link to={"/"}>
            <span className="py-4 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
              <FaIcons.FaDatabase className="mt-1" />
              <h1 className="px-6 mr-12">Dashboard</h1>
            </span>
          </Link>
          <Link to={"/Patients"}>
            <span className="py-4 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
              <FaIcons.FaUsersCog className="mt-1" />
              <h1 className="px-6 mr-16">Patients</h1>
            </span>
          </Link>

          <div>
            <div>
              <span
                onClick={() => setCounselling(!counselling)}
                className="py-4 m-3 rounded transition duration-200 cursor-pointer justify-center flex hover:bg-blue-400"
              >
                <RiIcons.RiStethoscopeLine className="mt-1 mr-3" />
                <h1 className="px-2.5 ">Counselling</h1>
                <FaIcons.FaArrowDown
                  className={`${
                    counselling ? "rotate-180" : ""
                  } mt-1 duration-300 mr-10`}
                />
              </span>
              <div
                className={`${
                  counselling ? "" : "hidden duration-300"
                } duration-300 bg-header-color relative cursor-pointer ml-12`}
              >
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaCheckCircle className="mt-1 text-green-500" />
                  <Link to={"/Counsellingapproved"} className="px-6 mr-2">
                    Approved
                  </Link>
                </span>
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaTimesCircle className="mt-1 text-red-500" />
                  <Link to={"/Counsellingcancelled"} className="px-6 mr-1">
                    Cancelled
                  </Link>
                </span>
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaClock className="mt-1 text-gray-300" />
                  <Link to={"/Counsellingpending"} className="px-6 mr-4">
                    Pending
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <span
                onClick={() => setPhsycological(!physcological)}
                className="py-4 m-3 rounded transition duration-200 cursor-pointer justify-center flex hover:bg-blue-400"
              >
                <RiIcons.RiHeartPulseLine className="mt-1 mr-3" />
                <h1 className="px-3 ">Assesment</h1>
                <FaIcons.FaArrowDown
                  className={`${
                    physcological ? "rotate-180" : ""
                  } mt-1 duration-300 mr-10`}
                />
              </span>
              <div
                className={`${
                  physcological ? "" : "hidden"
                } duration-300 bg-header-color relative cursor-pointer ml-12`}
              >
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaCheckCircle className="mt-1 text-green-500" />
                  <Link to={"/Assesmentapprove"} className="px-6 mr-2">
                    Approved
                  </Link>
                </span>
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaTimesCircle className="mt-1 text-red-500" />
                  <Link to={"/Assesmentcancelled"} className="px-6 mr-1">
                    Cancelled
                  </Link>
                </span>
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaClock className="mt-1 text-gray-300" />
                  <Link to={"/Assesmentpending"} className="px-6 mr-4">
                    Pending
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <span
                onClick={() => setSeminar(!seminar)}
                className="py-4 m-3 rounded transition duration-200 cursor-pointer justify-center flex hover:bg-blue-400"
              >
                <RiIcons.RiOrganizationChart className="mt-1 mr-4" />
                <h1 className="px-2.5">Trainings</h1>
                <FaIcons.FaArrowDown
                  className={`${
                    seminar ? "rotate-180" : ""
                  } mt-1 duration-300 mr-14  `}
                />
              </span>
              <div
                className={`${
                  seminar ? "" : "hidden"
                } duration-300 bg-header-color relative cursor-pointer ml-12`}
              >
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaCheckCircle className="mt-1 text-green-500" />
                  <Link to={"/Seminarapprove"} className="px-6 mr-2">
                    Approved
                  </Link>
                </span>
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaTimesCircle className="mt-1 text-red-500" />
                  <Link to={"/Seminarcancelled"} className="px-6 mr-1">
                    Cancelled
                  </Link>
                </span>
                <span className="py-2 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
                  <FaIcons.FaClock className="mt-1 text-gray-300" />
                  <Link to={"/Seminarpending"} className="px-6 mr-4">
                    Pending
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <Link to={"/Document"}>
            <span className="py-4 m-3 rounded transition duration-200 justify-center flex hover:bg-blue-400">
              <FaIcons.FaFileSignature className="mt-1" />
              <h1 className="px-6 mr-10">Documents</h1>
            </span>
          </Link>

          <span
            href="index"
            className="py-4 m-3 rounded transition duration-200 justify-center cursor-pointer flex hover:bg-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
            </svg>
            <span className="px-4 mr-16">About us</span>
          </span>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
