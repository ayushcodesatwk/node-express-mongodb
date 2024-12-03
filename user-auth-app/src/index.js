const { connectDb } = require("./config/db");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 4000;

const userRoutes = require("./routes/user");

//rendering server side using ejs
//telling our "view engine" (with space) is ejs
app.set("view engine", "ejs");

//middlewares for parsing form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// here we are telling ejs that our files are stored in this (views) folder.
app.set("views", path.resolve("./views"));
// getting css from public folder
app.use(express.static("public"));

app.use("/", userRoutes);
// app.use("/signup", loginRouter)

//connect db and start server

connectDb("mongodb://127.0.0.1:27017/auth-db");
app.listen(PORT, () => console.log("Server started"));
