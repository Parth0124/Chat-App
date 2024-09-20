const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')

const app = express();
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("Api is working!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  //   console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}!`));
