import { createContext, useEffect, useState, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import { io } from "socket.io-client";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
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
  const [openNewChat, setOpenNewChat] = useState(false);

  const { user } = useContext(AuthContext);

  // Set VITE_SOCKET_URL in your .env file (see .env.example).
  // Falls back to a local server for development.
  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    const newSocket = io(socketUrl, {
      reconnectionAttempts: 5,
      timeout: 20000,
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    newSocket.on("reconnect_attempt", () => {
      // console.log("Attempting to reconnect...");
    });

    newSocket.on("reconnect_failed", () => {
      console.error("Reconnection failed");
    });

    // Clean up socket on unmount or before reinitializing
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

  const updateOpenNewChat = useCallback((val) => {
    setOpenNewChat(val);
  }, []);

  const createChat = async (members, teamName) => {
    const response = await postRequest(`${baseUrl}/chats`, {
      members,
      teamName,
    });
    // console.log("response", response);
    if (response.error) {
      return console.log("Error occored while chat creation", response);
    }
    const chatExists = userChats?.find((c) => c._id === response._id);

    if (!chatExists) {
      setUserChats((prev) => [...prev, response]);
    }
    setCurrentChat(response);
  };

  const findUserByEmail = useCallback(async (email, user) => {
    const response = await getRequest(`${baseUrl}/users/findbyemail/${email}`);
    if (response.error) {
      return false;
    }
    await createChat([user?._id, response?._id]);
    return true;
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
        openNewChat,
        updateOpenNewChat,
        findUserByEmail,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
