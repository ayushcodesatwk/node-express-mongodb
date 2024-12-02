const express = require("express");

//import the mockdata
let users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");
const app = express();

const port = 8000;

// Connection- it will return a promise
mongoose
  .connect("mongodb://127.0.0.1:27017/db-1")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// Schema
// timestamps will keep a track for the time the user created.
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("user", userSchema);

// Routes
app.get("/", async (req, res) => {
  const alldbUsers = await User.find({});

  const html = `
        <ul>
            ${alldbUsers
              .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
              .join("")}
        </ul>`;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const alldbUsers = await User.find({});
  return res.json(alldbUsers);
});

//inbuilt middleware
app.use(express.urlencoded({ extended: false }));

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
});

app.patch("/api/users/:id", async (req, res) => {
  // Edit user with id
  // I have hardcoded lastName we can get it from frontend.
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });

  return res.json({ status: "Success" });
});

app.delete("/api/users/:id", async (req, res) => {
  // delete user with id
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log("BODY", body);

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log(result);

  return res.status(201).json({ msg: "success" });
});

app.listen(port, () => {
  console.log("Server started at port:", port);
});
