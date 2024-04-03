import { createContext, useEffect, useState, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [openShareCode, setOpenShareCode] = useState(false);

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

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const sendCodeMessage = useCallback(
    async (currentChatId, senderId, text, code) => {
      if (!text) return console.log("You must type somthing..");

      const response = await postRequest(`${baseUrl}/messages`, {
        text: text,
        senderId: senderId,
        chatId: currentChatId,
        code: code,
      });

      if (response.error) {
        return console.log(response.error);
      }
      console.log("msg response", response);
      // setTextMessage("");
      // setMessages((prev) => [...prev, response]);
      // setNewMessage(response);
    },
    []
  );

  const updateOpenShareCode = useCallback((val) => {
    setOpenShareCode(val);
  }, []);

  useEffect(() => {
    const code = `
    const createMessage = async (req, res) => {
      try {
        const { chatId, senderId, text, 
          code, isCode, lang } = req.body;
    
        const message = 
        new messageModel({ chatId, senderId, text, code, isCode, lang });
    
      const response = await message.save();
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    };`;
    // sendCodeMessage(
    //   "6601bb017ac5ec1da95c0072",
    //   "65a2c92a289aac397158c2f4",
    //   "Comment componet code..",
    //   code
    // );
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        sendCodeMessage,
        openShareCode,
        updateOpenShareCode,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
