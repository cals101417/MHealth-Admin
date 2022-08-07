import React, { useEffect, useState } from "react";
import Img from "../image1.jpg";
import { onSnapshot, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/UserAuthContext";

const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });

    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper pb-4 px-6 cursor-pointer hover:bg-blue-900 hover:text-white ${
          chat.firstName === user.firstName && "selected_user"
        }`}
        onClick={() => selectUser(user)}
      >
        <div className="user_info flex justify-between w-full items-center">
          <div className="user_detail flex items-center">
            <span className="mt-4">
              <img
                src={`data:image/jpeg;base64,${user.image}`}
                className="avatar lg:w-12 lg:h-12 w-full rounded-full border mr-4"
              />
            </span>

            <div
              className={`user_status w-2 h-2 items-start mr-2 rounded-full ${
                user.isOnline ? "online bg-green-700" : "offline bg-red-700"
              }`}
            ></div>
            <h4 className="hidden lg:block">
              {user.firstName} {user.middleName} {user.lastName}
            </h4>
            {data?.from !== user1 && data?.unread && (
              <span className="unread ml-12 bg-green-700 text-white p-4 rounded">
                New
              </span>
            )}
          </div>
        </div>
        {data && (
          <p className="truncate hidden lg:block text-sm w-48 overflow-hidden  -mt-4">
            <strong className="ml-20">
              {data.from === user1 ? "You: " : null}
            </strong>
            {data.message}
          </p>
        )}
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container text-center cursor-pointer ${
          [chat.firstName] === user.firstName && "selected_user  bg-yellow-500"
        }`}
      ></div>
    </>
  );
};

export default User;
