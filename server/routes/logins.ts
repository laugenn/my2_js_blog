import express from "express";

import {
  destroySessionLoginData,
  getSessionLoginData,
  isUnusedUserName,
  registerUser,
  signInUser,
  updatePassword,
} from "../controllers/logins";
import { requestErrorHandler } from "../helpers/errorHandler";
import { validationInputLogin } from "../helpers/validator";

const loginRoutes = express.Router();

loginRoutes.get("/", requestErrorHandler(isUnusedUserName));

// ログインのセッション状態の確認
loginRoutes.get("/session", requestErrorHandler(getSessionLoginData));

// 新規登録
loginRoutes.post(
  "/signup",
  validationInputLogin("signup"),
  requestErrorHandler(registerUser),
);

// ログイン
loginRoutes.post(
  "/signin",
  validationInputLogin("signin"),
  requestErrorHandler(signInUser),
);

// パスワード変更
loginRoutes.post(
  "/repass",
  validationInputLogin("repass"),
  requestErrorHandler(updatePassword),
);

// ログアウト
loginRoutes.post("/logout", requestErrorHandler(destroySessionLoginData));

export default loginRoutes;
