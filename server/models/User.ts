import { formatInTimeZone } from "date-fns-tz";
import mongoose from "mongoose";

// 日本時間で現在時刻を取得
const getNowDateJST = (): string => {
  return formatInTimeZone(new Date(), "Asia/Tokyo", "yyyy-MM-dd'T'HH:mm:ss");
};

export interface UserModelInterface {
  _id: string;
  userName: string;
  password: string;
  confirmPassword: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema<UserModelInterface>(
  {
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
  },
  {
    timestamps: true,
  },
);

// 登録前
userSchema.pre("save", function (next) {
  const now = getNowDateJST();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

// 更新前
userSchema.pre("updateOne", function (next) {
  const now = getNowDateJST();
  this.set({ updatedAt: now });
  next();
});

export const UserModel = mongoose.model("Users", userSchema);
