const { connectMongoDb } = require("./connection.js");
const express = require("express");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 9000;

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/db-1")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("error connecting to database-", err));

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Router
app.use("/", userRouter);

app.listen(PORT, () => console.log("server started"));
