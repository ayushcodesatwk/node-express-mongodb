import connectDb from "./config/db.js";
import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/user.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

//rendering server side using ejs
//telling our "view engine" (with space) is ejs
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser()); //now we can use req.cookie or res.cookie

//connect db and start server
connectDb("mongodb://127.0.0.1:27017/auth-db");

// here we are telling ejs that our files are stored in this (views) folder.
app.set("views", path.resolve("./views"));

app.use(router); // or simply like this- app.use('/', userRoutes)

app.listen(PORT, () => console.log("Server started at-", PORT));
