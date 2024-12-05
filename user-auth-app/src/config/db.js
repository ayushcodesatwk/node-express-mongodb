import mongoose from "mongoose"

export default async function connectDb(url) {
  return await mongoose
    .connect(url)
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log("Error connecting mongodb", err));
}

