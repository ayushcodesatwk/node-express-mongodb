import express from "express";
import {
  handleCreateNewUser,
  handleUserLogin,
  deleteById,
  handleUserLogout,
} from "../controllers/user.js";

const router = express.Router();

//get the data using req.body and post
router
  .route("/login")
  .get((req, res) => {
    return res.render("login");
  })
  .post(handleUserLogin);

// home page post and get request
router
  .route("/home")
  .get((req, res) => res.render("home"))
  .post(handleUserLogout);

router.route("/:id").delete(deleteById);

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
  .post(() => {});

export default router;
