const { connectMongoDb } = require("./connection");
const express = require("express");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");


const app = express();
const PORT = 9000;


//Connection
connectMongoDb("mongodb://127.0.0.1:27017/db-1");


//Middleware - Plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'))


//Router
app.use("/user", userRouter);


app.listen(PORT, () => console.log("server started"));