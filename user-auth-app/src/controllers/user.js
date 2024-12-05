import User from "../models/user.js";
import bcrypt from "bcrypt";
import {createToken}  from "../service/auth.js";

//sign up
async function handleCreateNewUser(req, res) {
  const { email, password, confPassword } = req.body;
  if (password != confPassword) return res.send("password mismatch!");

  try {
    //check if email already present;
    const user = await User.findOne({ email });
    console.log(user);

    //these methods returns a promise
    if (!user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const result = await User.create({
        email,
        password: hashedPassword,
      });

      const token = createToken(result._id);

      res.cookie("jwtoken", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });

      return res.status(201).json({ msg: "Success", _id: result._id });
    }
  } catch (err) {
    return res.status(404).json({ error: "user already exists" });
  }

  // console.log("pass", hashedPassword);
}

//login
async function handleUserLogin(req, res) {
  //get the email and password
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(user);

  try {
    //compare the password from the database with the plain text if user exists
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).send({ error: "wrong password" });
      } else {
        const token = createToken(user._id);
        res.cookie("jwtoken", token, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        });

        return res.redirect('/home');
      }
    } else {
      return res.status(400).send({ error: "user not found" });
    }
  } catch (err) {
    return res.status(400).send({ error: err });
  }
}

//logout 
async function handleUserLogout(req, res) {
  res.clearCookie("jwtoken");
  return res.status(200).redirect("/login");
}

//forgot
async function forgotPasswordHandler(req, res) {
  const { email } = req.body;

  try {
    const user = User.find({ email });

    if (user) {
    }
  } catch (err) {
    return res.status(401).send({ message: "User not found" });
  }
}

//delete user using postman
async function deleteById(req, res) {
  const id = req.params.id;
  const result = await User.findByIdAndDelete(id);
  return res.send(result);
}

export {
  handleCreateNewUser,
  handleUserLogin,
  forgotPasswordHandler,
  handleUserLogout,
  deleteById,
};
