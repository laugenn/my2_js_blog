import { z } from "zod";
import { FrontMessages } from "../enums/Enum";

// 必須
const STR_MIN_LENGTH: number = 1;
// タイトル：最大文字数
const TITLE_MAX_LENGTH: number = 20;
// コメント：最大文字数
const COMMENT_MAX_LENGTH: number = 100;
// 最大文字数 エラーメッセージフォーマット
const STR_MAX_LENGTH = (max: number) => `最大${max}文字までです`;

export const ContentFormSchema = z.object({
  // タイトル
  title: z
    .string()
    .trim()
    .min(STR_MIN_LENGTH, FrontMessages.REQUIRED)
    .max(TITLE_MAX_LENGTH, STR_MAX_LENGTH(TITLE_MAX_LENGTH)),
  // コンテンツタイプ
  contentType: z.enum(["text", "image"], {
    errorMap: () => ({
      message: FrontMessages.NO_VALUE_CONTENT_TYPE,
    }),
  }),
  // コメント
  comment: z
    .string()
    .trim()
    .min(STR_MIN_LENGTH, FrontMessages.REQUIRED)
    .max(COMMENT_MAX_LENGTH, STR_MAX_LENGTH(COMMENT_MAX_LENGTH)),
});
