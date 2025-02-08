import { Request, Response } from "express";

import { ServerMessages } from "../enums/enum";
import { ContentModelInterface, ContentsModel } from "../models/content";
import { safeFileName } from "../utils/fileUtils";
import { sanitizeSpecialChars } from "../utils/stringUtils";

/**
 * 主キー検索: 指定されたIDのコンテンツを取得する
 *
 * @route GET /api/contents/:id
 * @param {Request} req - リクエストオブジェクト（パラメータとしてidを含む）
 * @param {Response} res - レスポンスオブジェクト
 * @returns {Promise<void>} 結果を返却
 *
 * @description
 *  主キー検索成功した場合、結果をJSONで返却
 *  主キー検索失敗した場合、404エラーを返す
 *
 * @remark
 *  requestErrorHandlerでエラーハンドリングを行っているためtry-catchは不要
 *
 */
export const getByID = async (req: Request, res: Response) => {
  const editID = req.params.id;
  // 検索処理
  const editIDData = await ContentsModel.findById(editID);
  if (editIDData) {
    res.status(200).json(editIDData);
  } else {
    res.status(404).json({ message: ServerMessages.NO_DATA_GET_BY_ID });
  }
};

/**
 * 全体検索: 全件コンテンツを取得する
 *
 * @route GET /api/contents/all
 * @param {Request} req - リクエストオブジェクト
 * @param {Response} res - レスポンスオブジェクト
 * @returns {Promise<void>} 結果を返却
 *
 * @description
 *  検索結果をJSONで返却
 *
 * @remark
 *  requestErrorHandlerでエラーハンドリングを行っているためtry-catchは不要
 */
export const getAll = async (req: Request, res: Response) => {
  // 検索処理
  const allData = await ContentsModel.find();
  res.status(200).json(allData);
};

/**
 * 登録処理: コンテンツを新規登録する
 *
 * @route POST /api/contents/
 * @param {Request} req - リクエストオブジェクト
 * @param {Response} res - レスポンスオブジェクト
 * @returns {Promise<void>} 結果を返却
 *
 * @description
 *  登録結果をJSONで返却
 *
 * @remark
 *  requestErrorHandlerでエラーハンドリングを行っているためtry-catchは不要
 */
export const registerContent = async (req: Request, res: Response) => {
  // 登録情報
  const content = new ContentsModel(req.body);
  content.title = sanitizeSpecialChars(content.title);
  content.comment = sanitizeSpecialChars(content.comment);
  // ファイルが存在する場合、格納
  if (req.file) {
    content.uploadFile = req.file?.buffer.toString("base64");
    content.uploadFileName = safeFileName(req.file?.originalname);
    content.uploadFileMineType = req.file?.mimetype;
  }

  // 登録処理
  const insertedData = await content.save();
  res
    .status(200)
    .json({ data: insertedData, message: ServerMessages.SUCCESS_CREATE });
};

/**
 * 更新処理: 指定されたIDのコンテンツを更新する
 *
 * @route PATCH /api/contents/:id
 * @param {Request} req - リクエストオブジェクト（パラメータとしてidを含む）
 * @param {Response} res - レスポンスオブジェクト
 * @returns {Promise<void>} 結果を返却
 *
 * @description
 *  更新成功した場合、結果をJSONで返却
 *  更新失敗した場合または指定されたIDで主キー検索失敗した場合、404エラーを返す
 *
 * @remark
 *  requestErrorHandlerでエラーハンドリングを行っているためtry-catchは不要
 */
export const patchContent = async (req: Request, res: Response) => {
  // 主キーを取得
  const patchID = req.params.id;
  const isPatchID = await ContentsModel.findById(patchID);
  if (!isPatchID) {
    res.status(404).json({ message: ServerMessages.UPDATE_NO_DATA });
  }

  // 更新データ
  const updateData: ContentModelInterface = {
    _id: patchID,
    title: sanitizeSpecialChars(req.body.title),
    contentType: req.body.contentType,
    comment: sanitizeSpecialChars(req.body.comment),
  };

  // テキストの場合、ファイル情報リセット
  if (updateData.contentType == "text") {
    updateData.uploadFile = "";
    updateData.uploadFileName = "";
    updateData.uploadFileMineType = "";
  }

  // ファイルがアップロードされた場合のみ更新
  if (req.file) {
    updateData.uploadFile = req.file.buffer.toString("base64");
    updateData.uploadFileName = safeFileName(req.file.originalname);
    updateData.uploadFileMineType = req.file.mimetype;
  }

  // 更新処理
  const patchData = await ContentsModel.findByIdAndUpdate(patchID, updateData, {
    new: true,
  });
  if (patchData) {
    res
      .status(200)
      .json({ data: patchData, message: ServerMessages.SUCCESS_UPDATE });
  } else {
    res.status(404).json({ message: ServerMessages.UPDATE_NO_DATA });
  }
};

/**
 * 削除処理: 指定されたIDのコンテンツを削除する
 *
 * @route DELETE /api/contents/:id
 * @param {Request} req - リクエストオブジェクト（パラメータとしてidを含む）
 * @param {Response} res - レスポンスオブジェクト
 * @returns {Promise<void>} 結果を返却
 *
 * @description
 *  削除成功した場合、結果をJSONで返却
 *  指定されたIDで主キー検索失敗した場合、404エラーを返す
 *
 * @remark
 *  requestErrorHandlerでエラーハンドリングを行っているためtry-catchは不要
 */
export const deleteContent = async (req: Request, res: Response) => {
  // 主キーを取得
  const deleteID = req.params.id;
  // 削除処理
  const deleteData = await ContentsModel.findByIdAndDelete(deleteID, {
    new: true,
  });

  if (deleteData) {
    res
      .status(200)
      .json({ data: deleteData, message: ServerMessages.SUCCESS_DELETE });
  } else {
    res.status(404).json({ message: ServerMessages.DELETE_NO_DATA });
  }
};
