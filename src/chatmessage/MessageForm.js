import React from "react";

const MessageForm = ({ handleSubmit, message, setMessage, setImg }) => {
  return (
    <form
      className="left-2 w-full flex justify-end gap-12"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          className="w-96 p-3 px-6 rounded-full"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <button className="btn">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
