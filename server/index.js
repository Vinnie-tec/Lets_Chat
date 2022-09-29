const Express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");

const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoutes");
const messageRoute = require("./routes/messageRoute");

const { notFound, errorHandler } = require("./middleware/error");

dotenv.config();
connectDB();

const app = Express();

app.use(Express.json()); // to accept JSON data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(
  5000,
  console.log("Running on port " + PORT.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  // 
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  //
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  //
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  // 
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  //
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
