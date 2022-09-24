import React from "react";
import axios from "axios";

const Chat = () => {
  const [chats, setChats] = React.useState();

  const fetchData = async () => {
    const { data } = await axios.get("/api/chat");

    setChats(data);
    console.log(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chat;
