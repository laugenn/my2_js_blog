import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("接続成功"))
  .catch((e) => console.log(e));

const client = mongoose.connection;
client.once("error", function (err) {
  console.error("connection error: ", err);
});

client.once("open", function () {
  console.log("Connected successfully");
});
