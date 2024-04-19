import { createContext, useEffect, useState, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [openShareCode, setOpenShareCode] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    text: "",
  });
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [potentialChats, setPotentialChats] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  console.log("notifications", notifications);
  // initialize socket
  useEffect(() => {
    // socket domain/server
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // clean up socket, on reconnection or no longer needed
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // add online users
  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", user?._id);

    // defining event
    socket.on("getOnlineUsers", (response) => {
      setOnlineUsers(response);
    });

    // kill the event/clean up function
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send message
  useEffect(() => {
    if (!socket) return;

    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //receive message and notification
  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (response) => {
      console.log("get message socket emit..");
      if (currentChat?._id !== response.chatId) return;

      setMessages((prev) => [...prev, response]);
    });

    socket.on("getNotification", (response) => {
      const isChatOpen = currentChat?.members.some(
        (id) => id === response.senderId
      );
      if (isChatOpen) {
        setNotifications((prev) => [{ ...response, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [response, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

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
  }, [user, notifications]);

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

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);
      if (response.error) {
        return console.log("Error occored while getting users", response);
      }
      const pChtas = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChtas);
      setAllUsers(response);
    };

    getUsers();
  }, [userChats]);

  const sendMessage = useCallback(
    async (currentChatId, senderId, text, code, language) => {
      setIsMessageSending(true);
      const response = await postRequest(`${baseUrl}/messages`, {
        text: text,
        senderId: senderId,
        chatId: currentChatId,
        code: code,
        lang: language,
      });

      if (response.error) {
        return false;
      }
      setIsMessageSending(false);

      console.log("msg response", response);

      setAlert({
        open: true,
        severity: "success",
        text: "Code Sent Sucessfully!",
      });
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);

      return true;
    },
    []
  );

  const updateOpenShareCode = useCallback((val) => {
    setOpenShareCode(val);
  }, []);

  const updateAlert = useCallback((val) => {
    setAlert(val);
  }, []);

  const markNotificationAsRead = useCallback((n, userChats, notifications) => {
    const desiredChat = userChats?.find((chat) => chat._id === n.chatId);
    const mNotifications = notifications?.map((el) => {
      if (n.chatId === el.chatId) {
        return { ...el, isRead: true };
      }
      return el;
    });

    setNotifications(mNotifications);
    if (desiredChat) {
      updateCurrentChat(desiredChat);
    }
  }, []);

  const markThisUserNotificationsAsRead = useCallback(
    (chatId, notifications) => {
      const mNotifications = notifications?.map((n) => {
        if (n.chatId === chatId) {
          return { ...n, isRead: true };
        }
        return n;
      });
      setNotifications(mNotifications);
    },
    []
  );

  const markAllNotificationAsRead = useCallback((notifications) => {
    const mNotifications = notifications?.map((n) => {
      return { ...n, isRead: true };
    });
    setNotifications(mNotifications);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        isMessageSending,
        sendMessage,
        openShareCode,
        updateOpenShareCode,
        alert,
        updateAlert,
        newMessage,
        onlineUsers,
        notifications,
        potentialChats,
        allUsers,
        markNotificationAsRead,
        markThisUserNotificationsAsRead,
        markAllNotificationAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
