const User = require('../models/user')

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);

  if(!user) return res.status(404).json({error: "user not found"});
  return res.json(user);

}

async function updateUserById(req, res){

  await User.findByIdAndUpdate(req.params,id, {lastName: 'getItFromFrontEnd'});
  return res.json({status: "Success"});
}

async function deleteUserById(req, res){

  await User.findByIdAndDelete(req.params.id);
  return res.json({status: "Success"});
}

module.exports = {
  handleGetAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
