import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import { deleteDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const deletemsg = async (id) => {
    const assessmentDoc = doc(db, "chat", id, "conversation", id);
    await deleteDoc(assessmentDoc);
    const cityRef = doc(db, "cities", "BJ");
  };

  return (
    <div
      className={`message_wrapper p-2 text-sm ${
        msg.from === user1
          ? "own text-right flex justify-end "
          : " flex justify-start"
      }`}
      ref={scrollRef}
    >
      <div>
        <p
          className={`p-4 block max-w-2xl rounded ${
            msg.from === user1
              ? "me text-white bg-purple-500"
              : "friend bg-blue-500"
          }`}
        >
          {msg.media ? (
            <img src={msg.media} alt={msg.message} className="rounded" />
          ) : null}
          {msg.message}
          <br />
          <small>
            <Moment fromNow>{msg.timestamp.toDate()}</Moment>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Message;
