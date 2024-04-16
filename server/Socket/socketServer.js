import { Server } from "socket.io";

const setupSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let onlineUsers = [];

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("addNewUser", (userId) => {
      !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({ userId, socketId: socket.id });
      console.log("onlineUsers", onlineUsers);
      io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message) => {
      const user = onlineUsers.find((u) => u.userId === message.recipientId);
      if (user) {
        io.to(user.socketId).emit("getMessage", message);
        io.to(user.socketId).emit("getNotification", {
          senderId: message.senderId,
          isRead: false,
          date: new Date(),
          chatId: message.chatId,
        });
      }
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit("getOnlineUsers", onlineUsers);
    });
  });
};

export default setupSocketServer;
