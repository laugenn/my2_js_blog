import argon2 from "argon2";
import { Request, Response } from "express";

import { ServerMessages } from "../enums/enum";
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
 * 新規ユーザー登録処理
 *
 * @route POST /api/login/signup
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

/**
 * パスワード比較
 *
 * @param {string} insertedPassword - 登録済みのパスワード
 * @param {string} inputPassword - 入力されたパスワード
 * @returns {Promise<boolean>} 結果を返却
 *
 */
const isMatchPassword = async (
  insertedPassword: string,
  inputPassword: string,
) => {
  return await argon2.verify(insertedPassword, inputPassword);
};

/**
 * ログイン処理
 *
 * @route POST /api/login/signin
 * @param {Request} req - リクエストオブジェクト
 * @param {Response} res - レスポンスオブジェクト
 * @returns {Promise<void>} 結果を返却
 *
 * @description
 *  ログイン情報のパラメータが取得できなかった場合は実施しない
 *  ユーザー検索でヒットしなかった場合は404エラーで返す
 *  パスワードが一致しなかった場合は404エラーを返す
 *
 * @remark
 *  requestErrorHandlerでエラーハンドリングを行っているためtry-catchは不要
 */
export const signInUser = async (req: Request, res: Response) => {
  // ログイン情報を取得
  const inputLoginData = req.body;
  if (!inputLoginData.userName && !inputLoginData.password) {
    return;
  }

  // ユーザー名検索
  const loginUserName = sanitizeSpecialChars(inputLoginData.userName);
  const userData = await UserModel.findOne({ userName: loginUserName });
  if (!userData) {
    res.status(404).json({ message: ServerMessages.NOT_FOUND_USER });
    return;
  }

  // パスワードが一致するか
  const isMatch = await isMatchPassword(
    userData.password,
    inputLoginData.password,
  );
  if (!isMatch) {
    res.status(404).json({ message: ServerMessages.UN_MATCH_PASSWORD });
    return;
  }

  res.status(200).send();
};
