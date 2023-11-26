const { config } = require("dotenv");
config();
const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const cors = require("cors");

//routes
const authRoutes = require("./routes/authRoutes");
const promptRoutes = require("./routes/promptRoutes");
const { getPromptRes } = require("./modules/chatapi");

const app = express();
// middleware
app.use(cors);
app.use(express.static("public"));
app.use(express.json());
app.use(authRoutes);
app.use(promptRoutes);

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.db_uri;
let server = app.listen(4000);
let io = {};

const main = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};
main()

io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on('user_msg', async (data) => {
    console.log("user txt", data);
    let resData = await getPromptRes(data.message)
    socket.emit("ai_prompt", {
      agent: 2,
      msg: resData
    })

  });
});

// routes
app.get("/", (req, res) => res.render("home"));
