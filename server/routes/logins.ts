import express from "express";

import { isUnusedUserName, registerUser } from "../controllers/logins";
import { requestErrorHandler } from "../helpers/errorHandler";
import { validationInputLogin } from "../helpers/validator";

const loginRoutes = express.Router();

loginRoutes.get("/", requestErrorHandler(isUnusedUserName));

// 登録処理
loginRoutes.post("/", validationInputLogin, requestErrorHandler(registerUser));

export default loginRoutes;
