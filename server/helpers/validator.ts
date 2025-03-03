import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { ContentFormSchema } from "../../src/schemas/ContentForm";
import {
  SignInFormSchema,
  SignUpFormSchema,
} from "../../src/schemas/LoginForm";
import { ServerMessages } from "../enums/enum";

/**
 * フロントのバリデーションを流用し再度入力チェックを行う（コンテンツ追加）
 *  バリデーションに失敗した場合、エラーメッセージをセットし400エラーを返す
 *  バリデーションに成功した場合、req.bodyをバリデーション済みのデータで更新し、次の処理へ進む
 *
 * @param {Request} req - Requestオブジェクト
 * @param {Response} res - Responseオブジェクト
 * @param {NextFunction} next - NextFunction
 */
export const validationInputContent = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const validationResult = ContentFormSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: formatErrors(validationResult.error) });
    return;
  } else {
    req.body = validationResult.data;
    next();
  }
};

/**
 * フロントのバリデーションを流用し再度入力チェックを行う（ログイン&サインアップ）
 * バリデーションに失敗した場合、エラーメッセージをセットし400エラーを返す
 * バリデーションに成功した場合、req.body をバリデーション済みのデータで更新し、次の処理へ進む
 *
 * @param {string} type - signinまたはsignup
 */
export const validationInputLogin = (type: "signin" | "signup") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema = type === "signin" ? SignInFormSchema : SignUpFormSchema;
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ errors: formatErrors(validationResult.error) });
      return;
    } else {
      req.body = validationResult.data;
      next();
    }
  };
};

/**
 * バリデーションエラーのメッセージ変換（フロントで表示用）
 * @param {z.ZodError} error - バリデーションエラー
 * @returns {Record<string, string>}
 */
const formatErrors = (error: z.ZodError): Record<string, string> => {
  // エラーメッセージを持つ項目名とエラーメッセージをペアとして返却する
  return Object.entries(error.format()).reduce(
    (acc, [key, value]) => {
      if (key == "_error") {
        return acc;
      }
      if (typeof value == "object" && "_errors" in value) {
        acc[key] =
          Array.isArray(value._errors) &&
          value._errors.length > 0 &&
          value._errors[0];
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};

/**
 * アップロード画像のサイズチェック（任意項目のためmulterのlimitsは使用しない）
 *  バリデーションに失敗した場合、400エラーを返す
 *  バリデーションに成功した場合、次の処理へ進む
 *
 * @param {Request} req - Requestオブジェクト
 * @param {Response} res - Responseオブジェクト
 * @param {NextFunction} next - NextFunction
 */
export const validationUploadFile = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.file) {
    const uploadFile = req.file;
    const fileMaxSize = 1048576; // 1 * 1024 * 1024（1MB)
    if (fileMaxSize < uploadFile.size) {
      res.status(400).json({ message: ServerMessages.FAIL_UPLOAD_SIZE_OVER });
      return;
    }
  }
  next();
};
