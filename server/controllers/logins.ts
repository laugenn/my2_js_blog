import argon2 from "argon2";
import { Request, Response } from "express";

import { UserModel } from "../models/user";
import { sanitizeSpecialChars } from "../utils/stringUtils";

/**
 * 主キー検索処理: ユーザー名が既に使用されていないか
 *
 * @route GET /api/login/
 * @param {Request} req - リクエストオブジェクト
 * @param {Response} res - レスポンスオブジェクト
 * @returns {Promise<void>} isData:booleanをjson形式で返却
 *
 * @description
 *  パラメータが取得できなかった場合は実施しない
 *
 * @remark
 *  requestErrorHandlerでエラーハンドリングを行っているためtry-catchは不要
 */
export const isUnusedUserName = async (req: Request, res: Response) => {
  // ユーザー名取得
  const inputUserName = req.query.username as string;
  if (!inputUserName) {
    return;
  }

  // 登録時と同様に変換後、検索を行う
  const userData = await UserModel.findOne({
    userName: sanitizeSpecialChars(inputUserName),
  });
  res.status(200).json({ isData: !!userData });
};

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
