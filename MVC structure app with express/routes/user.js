const express = require("express");
const { handleGetAllUsers } = require("../controllers/user");
const router = express.Router();

//Routes
router.get("/", handleGetAllUsers);

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
});

router.patch("/:id", async (req, res) => {
  // Edit user with id
  // I have hardcoded lastName we can get it from frontend.
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });

  return res.json({ status: "Success" });
});

router.delete("/:id", async (req, res) => {
  // delete user with id
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
});

router.post("/", async (req, res) => {
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

module.exports = router;
