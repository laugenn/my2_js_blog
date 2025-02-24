import argon2 from "argon2";
import { Request, Response } from "express";

import { UserModel } from "../models/User";
import { sanitizeSpecialChars } from "../utils/stringUtils";

/**
 * 登録処理: ユーザーを新規登録する
 *
 * @route POST /api/login/
 * @param {Request} req - リクエストオブジェクト
 * @param {Response} res - レスポンスオブジェクト
 * @returns {Promise<void>} 結果を返却
 *
 * @remark
 *  requestErrorHandlerでエラーハンドリングを行っているためtry-catchは不要
 */
export const registerUser = async (req: Request, res: Response) => {
  // 登録情報
  const loginUser = new UserModel(req.body);
  const hashPassword: string = await argon2.hash(req.body.password);
  loginUser.userName = sanitizeSpecialChars(req.body.userName);
  loginUser.password = hashPassword;
  loginUser.confirmPassword = hashPassword;

  // 登録処理
  await loginUser.save();
  res.status(200).send();
};
