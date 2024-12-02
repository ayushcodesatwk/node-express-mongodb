const User = require("../models/user");

//get all users
async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});

  // const html = `
  //       <ul>
  //           ${allDbUsers
  //             .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
  //             .join("")}
  //       </ul>`;

  // res.send(html);

  return res.json(allDbUsers);
}

//get using id
async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

//patch
async function updateUserById(req, res) {
  await User.findByIdAndUpdate(req.params, id, {
    lastName: "getItFromFrontEnd",
  });
  return res.json({ status: "Success" });
}

//delete
async function deleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

//post
async function handleCreateNewUser(req, res) {
  const body = req.body;

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job.title,
  });

  return res.status(201).json({ msg: "Success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  handleCreateNewUser,
};
