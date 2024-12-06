import nodemailer from "nodemailer";
import randomstring from "randomstring";
import User from "../models/user.js";
import bcrypt from "bcrypt";

//logout
async function handleUserLogout(req, res) {
  const token = req.cookies.jwtoken;
  console.log(token);

  if (token) {
    res.clearCookie("jwtoken");
  }

  return res.status(200).redirect("/login");
}

//send mail
async function sendForgotPasswordMail(name, email, token, req, res) {
  try {
    // we have to provide our username and password in the auth
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      },
    });

    const mailOption = {
      from: process.env.DB_USER,
      to: email,
      subject: "Forgot Password",
      html: `<p> Hi! ${name}, Please click on the <a href="http://localhost:4000/forgotreset?token=${token}"> reset password link</a>`,
    };

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail sent- ", info.response);
      }
    });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
}

//forgot handler
async function forgotPasswordHandler(req, res) {
  const { email } = req.body;

  try {
    const user = await User.find({ email });

    if (user.length > 0) {
      //creating a token only when forgot password clicked, it'll get removed when user reset the password
      const randomString = randomstring.generate();

      await User.updateOne({ email: email }, { $set: { token: randomString } });

      await sendForgotPasswordMail(user[0].name, email, randomString, req, res);

      res.status(200).send({
        success: true,
        msg: "Please check your mail & reset your password...",
      });
    }
  } catch (err) {
    return res.status(401).send({ message: "User not found" });
  }
}

//reset forgotten password
async function resetForgotPasswordHandler(req, res) {
  const { password, confpassword } = req.body;

  if (password != confpassword) {
    return res.status(401).send("Password mismatch!!");
  } else {
    try {
      const token = req.query.token;

      const user = await User.findOne({ token });

      if(user){
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
    
          await User.updateOne(
            {
              name: user.name,
              email: user.email,
            },
            {
              $set: { password: hashedPassword },
            },
            {
              $set: { token: "" },
            }
          );
    
          return res
            .status(200)
            .send({ success: true, msg: `password updated successfully!` });
      }
      else{
        return res.status(400).send({ success: false, msg: `Token expired- ${error.message}` });
      }
    } catch (error) {
      return res.status(400).send({ success: false, msg: 'Token expired...' });
    }
  }
}

//reset existing password
async function resetPasswordHandler(req, res) {
  try {
  } catch (error) {}
}

export {
  forgotPasswordHandler,
  handleUserLogout,
  resetPasswordHandler,
  resetForgotPasswordHandler,
};
