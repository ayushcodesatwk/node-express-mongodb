const express = require("express");
const router = express.Router();
const { handleCreateNewUser, handleUserLogin } = require("../controllers/user")

//get the data using req.body and post
router
  .route("/login")
  .get((req, res) => {
    return res.render("login");
  })
  .post(handleUserLogin);

router
  .route("/signup")
  .get((req, res) => {
    return res.
    render("signup");
  })
  .post(handleCreateNewUser);

module.exports = router;
