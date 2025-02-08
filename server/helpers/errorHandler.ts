import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * エラーハンドリングを行うミドルウェア
 *
 * @param {RequestHandler} controller - 実行するコントローラー関数
 * @returns {RequestHandler} 指定されたコントローラー関数
 * @description コントローラー内で発生したエラーは、上位のエラーハンドリングミドルウェアで処理する
 */
export const requestErrorHandler = (
  controller: RequestHandler,
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
};
