const { User } = require("../models/user");

async function handleCreateNewUser(req, res) {
  const { email, password, confPassword } = req.body;

  if (password != confPassword) return res.send("password mismatch!");

  //check if email already present;
  const user = await User.findOne({ email });
  console.log(user);

  //these methods returns a promise
  if (!user) {
    const result = await User.create({
      email,
      password,
    });

    return res.status(201).json({ msg: "Success", _id: result._id });
  }

  return res.status(404).json({ error: "user already exists" });
}

function handleUserLogin() {}

function createUserHandler() {}

function forgotPasswordHandler() {}

module.exports = {
  handleCreateNewUser,
  handleUserLogin,
  createUserHandler,
  forgotPasswordHandler,
};
