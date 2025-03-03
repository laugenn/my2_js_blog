import express from "express";

import {
  isUnusedUserName,
  registerUser,
  signInUser,
} from "../controllers/logins";
import { requestErrorHandler } from "../helpers/errorHandler";
import { validationInputLogin } from "../helpers/validator";

const loginRoutes = express.Router();

loginRoutes.get("/", requestErrorHandler(isUnusedUserName));

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

export default loginRoutes;
