import mongoose from "mongoose";

export interface UserModelInterface {
  _id: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

const userSchema = new mongoose.Schema<UserModelInterface>({
  userName: {
    type: String,
    required: true,
    max: 10,
  },
  password: {
    type: String,
    required: true,
    max: 16,
  },
  confirmPassword: {
    type: String,
    required: true,
    max: 16,
  },
});

export const UserModel = mongoose.model("Users", userSchema);
