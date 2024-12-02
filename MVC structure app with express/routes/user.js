const express = require("express");

const {
  handleGetAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");
const router = express.Router();

//Routes
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
