const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

//Routes
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);
router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
