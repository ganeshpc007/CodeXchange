import { createContext, useEffect, useState, useCallback } from "react";
import { getRequest, baseUrl } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  console.log("userChats", userChats);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        const chats = await getRequest(`${baseUrl}/chats/${user._id}`);
        setUserChats(chats);
      }
    };

    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider value={{ userChats, updateCurrentChat, currentChat }}>
      {children}
    </ChatContext.Provider>
  );
};
