import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { ServerMessages } from "../enums/enum";

// Multerのストレージ設定(メモリ)
const storage = multer.memoryStorage();

/**
 * Multerのファイルフィルダー設定
 * 許可された拡張子とMIMEタイプを持つファイルのみ許可する
 *
 * @param {Request} req - リクエストオブジェクト
 * @param {Express.Multer.File} file - アップロードされたファイル情報
 * @param {error: Error | null, acceptFile: boolean}} cb - コールバック関数
 *   - 第一引数: エラーオブジェクト(許可しないファイルの場合)またはnull(許可するファイルの場合)
 *   - 第二引数: true(許可するファイルの場合)またはfalse(許可しないファイルの場合)
 */
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  // 拡張子を取得
  const extension = path.extname(file.originalname);
  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  const allowedMineTypes = ["image/png", "image/jpeg"];

  // 拡張子とMINEタイプのチェック
  if (
    !allowedExtensions.includes(extension) ||
    !allowedMineTypes.includes(file.mimetype)
  ) {
    // ファイルを許可せず処理終了
    return cb(new Error(ServerMessages.FAIL_UPLOAD_MINE_TYPE));
  }
  // ファイルを許可する
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

export { upload };
