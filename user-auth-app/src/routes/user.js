import express from "express";

import {
  handleCreateNewUser,
  handleUserLogin,
  deleteById,
} from "../controllers/user.js";

import {
  forgotPasswordHandler,
  handleUserLogout,
  resetForgotPasswordHandler,
  resetPasswordHandler,
} from "../controllers/passwordController.js";

import requireAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

//get the data using req.body and post
router
  .route("/login")
  .get((req, res) => {
    const token = req.cookies.jwtoken;
    if (token) {
      handleUserLogout(req, res);
    } else {
      return res.render("login");
    }
  })
  .post(handleUserLogin);

// home page post and get request
router
  .route("/home")
  .get((req, res) => res.render("home"))
  .post(handleUserLogout);

router.route("/:id").delete(deleteById);

// product page
router.route("/home/product").get((req, res, next) => {
  requireAuth(req, res, next);
  return res.render("product");
});

// signup page post and get request
router
  .route("/signup")
  .get((req, res) => {
    return res.render("signup");
  })
  .post(handleCreateNewUser);

//forgot password page requests
router
  .route("/forgot")
  .get((req, res) => {
    return res.render("forgot");
  })
  .post(forgotPasswordHandler);


//reset password page requests
router
  .route("/reset")
  .get((req, res) => {
    return res.render("reset");
  })
  .post(resetPasswordHandler);

  //forgot pass link from email
router.route("/forgotreset").get((req, res) => {
  return res.render('forgotreset')
}).post(resetForgotPasswordHandler)

export default router;
