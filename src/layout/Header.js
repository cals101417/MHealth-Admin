import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth, upload } from "../context/UserAuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);
  const handleLogout = async () => {
    try {
      await logout();
      return navigate("/Login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-end p-5 bg-white">
      <div className="flex gap-x-6">
        <Link to={"/Chats"}>
          <span className="rounded transition duration-200 justify-center flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 ">
            <RiIcons.RiMessage2Fill size="25" className="mt-0.5" />
          </span>
        </Link>
        <div className="flex justify-start gap-12">
          <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 cursor-pointer">
            <img
              src={photoURL}
              className="avatar rounded-full w-7 h-7 object-cover"
            />
          </div>
        </div>

        <button
          className="rounded-md p-1 cursor-pointer hover:bg-light-white text-xl items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
          onClick={handleLogout}
        >
          <FaIcons.FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};
