const mongoose = require("mongoose");

function connectDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log("Error connecting mongodb", err));
}

module.exports = { connectDb };
