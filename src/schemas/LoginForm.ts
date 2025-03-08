import { z } from "zod";
import { FrontMessages } from "../enums/Enum";

// 必須
const STR_MIN_LENGTH: number = 1;
// ユーザー名：最大文字数
const NAME_MAX_LENGTH: number = 10;
// 最大文字数 エラーメッセージフォーマット
const STR_MAX_LENGTH = (max: number) => `最大${max}文字までです。`;

// 共通）バリデーション
const commonLoginFormSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(STR_MIN_LENGTH, FrontMessages.REQUIRED)
    .max(NAME_MAX_LENGTH, STR_MAX_LENGTH(NAME_MAX_LENGTH)),
  password: z
    .string()
    .trim()
    .min(STR_MIN_LENGTH, FrontMessages.REQUIRED)
    .regex(/^[a-zA-Z0-9/._!/+/^&]{12,16}$/, FrontMessages.PASS_REGEX_MESSAGE),
});

// サインインバリデーション
export const SignInFormSchema = commonLoginFormSchema
  .extend({})
  .superRefine(({ userName, password }, ctx) => {
    // 小文字アルファベットが含まれているかチェックする
    if (password.search(/[a-z]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_SMALL_ALF,
        path: ["password"],
      });
    }

    // 大文字アルファベットが含まれているかチェックする
    if (password.search(/[A-Z]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_BIG_ALF,
        path: ["password"],
      });
    }

    // 数字が含まれているかチェックする
    if (password.search(/[0-9]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_NUM,
        path: ["password"],
      });
    }

    // 記号が含まれているかチェックする
    if (password.search(/[/._!/+/^&]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_SYMBOL,
        path: ["password"],
      });
    }
  });

// サインアップバリデーション
export const SignUpFormSchema = commonLoginFormSchema
  .extend({
    confirmPassword: z
      .string()
      .trim()
      .min(STR_MIN_LENGTH, FrontMessages.REQUIRED),
  })
  .superRefine(({ userName, password, confirmPassword }, ctx) => {
    // 小文字アルファベットが含まれているかチェックする
    if (password.search(/[a-z]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_SMALL_ALF,
        path: ["password"],
      });
    }

    // 大文字アルファベットが含まれているかチェックする
    if (password.search(/[A-Z]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_BIG_ALF,
        path: ["password"],
      });
    }

    // 数字が含まれているかチェックする
    if (password.search(/[0-9]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_NUM,
        path: ["password"],
      });
    }

    // 記号が含まれているかチェックする
    if (password.search(/[/._!/+/^&]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_SYMBOL,
        path: ["password"],
      });
    }

    // パスワードと確認用パスワードが一致しているかチェックする
    if (password != confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_MISMATCH,
        path: ["confirmPassword"],
      });
    }
  });

// パスワード変更バリデーション
export const rePasswordFormSchema = commonLoginFormSchema
  .extend({
    rePassword: z
      .string()
      .trim()
      .min(STR_MIN_LENGTH, FrontMessages.REQUIRED)
      .regex(/^[a-zA-Z0-9/._!/+/^&]{12,16}$/, FrontMessages.PASS_REGEX_MESSAGE),
    confirmPassword: z
      .string()
      .trim()
      .min(STR_MIN_LENGTH, FrontMessages.REQUIRED),
  })
  .superRefine(({ userName, password, rePassword, confirmPassword }, ctx) => {
    if (password == rePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.NO_CHANGE_PASS,
        path: ["password"],
      });
    }

    // 小文字アルファベットが含まれているかチェックする
    if (rePassword.search(/[a-z]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_SMALL_ALF,
        path: ["rePassword"],
      });
    }

    // 大文字アルファベットが含まれているかチェックする
    if (rePassword.search(/[A-Z]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_BIG_ALF,
        path: ["rePassword"],
      });
    }

    // 数字が含まれているかチェックする
    if (rePassword.search(/[0-9]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_NUM,
        path: ["rePassword"],
      });
    }

    // 記号が含まれているかチェックする
    if (rePassword.search(/[/._!/+/^&]/) == -1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_REGEX_NO_SYMBOL,
        path: ["rePassword"],
      });
    }

    // パスワードと確認用パスワードが一致しているかチェックする
    if (rePassword != confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: FrontMessages.PASS_MISMATCH,
        path: ["confirmPassword"],
      });
    }
  });
