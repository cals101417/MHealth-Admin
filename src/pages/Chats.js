import React, { useEffect, useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import { db } from "../firebase";
import { useAuth } from "../context/UserAuthContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import User from "../chatmessage/User";
import MessageForm from "../chatmessage/MessageForm";
import Message from "../chatmessage/Message";
import Sidebar from "../layout/Sidebar";
import { Header } from "../layout/Header";
export function Chats() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [message, setMessage] = useState("");
  const [opendelete, setOpendelete] = useState(false);
  const [msgs, setMsgs] = useState([]);

  const ref = useRef();
  const user1 = user.uid;

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (opendelete && ref.current && !ref.current.contains(e.target)) {
        setOpendelete(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [opendelete]);

  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("firstName", "not-in", [user1]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "chat", id, "conversation");
    const q = query(msgsRef, orderBy("timestamp", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    await addDoc(collection(db, "chat", id, "conversation"), {
      message,
      from: user1,
      receiverId: user2,
      timestamp: Timestamp.fromDate(new Date()),
    });

    await setDoc(doc(db, "lastMsg", id), {
      message,
      from: user1,
      receiverId: user2,
      timestamp: Timestamp.fromDate(new Date()),
      unread: true,
    });

    setMessage("");
  };
  const deleteConvo = async (uid) => {
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const seminarDoc = doc(db, "chat", id, "conversation");
    await deleteDoc(seminarDoc);
  };
  return (
    <div className="flex bg-gray-100 w-full">
      <Sidebar />

      <div className="min-h-screen flex-1">
        <Header />
        <div class="flex">
          <div className="relative bg-gray-200 border-t-2">
            <div className="users_container mt-2 lg:p-4">
              <div className="h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-gray-300 scrollbar-track-white">
                {users.map((user) => (
                  <User
                    key={user.uid}
                    user={user}
                    selectUser={selectUser}
                    user1={user1}
                    chat={chat}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="min-h-full flex-1 border-l-2">
            <div className="messages_container flex-1  w-full">
              {" "}
              {chat ? (
                <>
                  <div className="messages_user flex justify-start gap-4 px-12 text-white py-4 bg-gray-700 border-b-2">
                    <div className=" flex ">
                      <img
                        src={`data:image/jpeg;base64,${chat.image}`}
                        className="avatar w-10 h-10 rounded-full border mr-6"
                      />
                      <h1 className="text-lg mt-1">
                        {chat.firstName} {chat.middleName} {chat.lastName}
                      </h1>
                    </div>
                    <div>
                      <div>
                        <FaIcons.FaEllipsisH
                          onClick={() => setOpendelete(true)}
                          className="mt-1.5 text-2xl cursor-pointer"
                        />
                        {opendelete && (
                          <div
                            ref={ref}
                            onClick={() => deleteConvo(chat.uid)}
                            className="bg-white rounded-lg text-black text-left p-4 justfiy-left absolute"
                          >
                            <span className="flex gap-2 hover:opacity-60 cursor-pointer">
                              <FaIcons.FaTrash className="mt-1 text-red-400" />{" "}
                              Delete
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="messages h-[715px] p-6 overflow-y-scroll overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-gray-300 scrollbar-track-white">
                    {msgs.length
                      ? msgs.map((msg, i) => (
                          <Message key={i} msg={msg} user1={user1} />
                        ))
                      : null}
                  </div>
                  <hr className="mb-3 h-0.5 mt-1 bg-gray-700"></hr>
                  <MessageForm
                    handleSubmit={handleSubmit}
                    message={message}
                    setMessage={setMessage}
                  />
                </>
              ) : (
                <div className="min-h-screen">
                  <div className="no_conv">
                    <h1 className="text-center mt-6 text-2xl font-bold">
                      Select a user to start conversation
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
