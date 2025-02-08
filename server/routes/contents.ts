import express from "express";

import {
  deleteContent,
  getAll,
  getByID,
  patchContent,
  registerContent,
} from "../controllers/contents";
import { requestErrorHandler } from "../helpers/errorHandler";
import { upload } from "../helpers/upload";
import {
  validationInputContent,
  validationUploadFile,
} from "../helpers/validator";

const contentsRoutes = express.Router();

// 一覧表示
contentsRoutes.get("/all", requestErrorHandler(getAll));

// 登録処理
contentsRoutes.post(
  "/",
  upload.single("uploadFile"),
  validationInputContent,
  validationUploadFile,
  requestErrorHandler(registerContent),
);

// 編集表示
contentsRoutes.get("/:id", requestErrorHandler(getByID));

// 更新処理
contentsRoutes.patch(
  "/:id",
  upload.single("uploadFile"),
  validationInputContent,
  validationUploadFile,
  requestErrorHandler(patchContent),
);

// 削除処理
contentsRoutes.delete("/:id", requestErrorHandler(deleteContent));

export default contentsRoutes;
