import { describe, expect, it } from "vitest";

import { LoginFormSchema } from "../../../src/schemas/LoginForm";

interface formInput {
  userName: string;
  password: string;
  confirmPassword: string;
}

describe("ログイン画面の入力チェック", () => {
  it("OK) 正常系", () => {
    const input: formInput = {
      userName: "ユーザー名12345", // 10桁
      password: "aiueoaiue5!A", // 12桁
      confirmPassword: "aiueoaiue5!A",
    };
    const result = LoginFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("NG) 全て空文字", () => {
    const input: formInput = {
      userName: "",
      password: "",
      confirmPassword: "",
    };
    const result = LoginFormSchema.safeParse(input);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors.length).toBe(8);
      expect(result.error.errors[0].message).toBe("必須です。");
      expect(result.error.errors[0].path).toEqual(["userName"]);
      expect(result.error.errors[1].message).toBe("必須です。");
      expect(result.error.errors[1].path).toEqual(["password"]);
      expect(result.error.errors[2].message).toBe(
        "英字,数字,記号(._!+^&)を組み合わせた12~16文字で入力してください。",
      );
      expect(result.error.errors[2].path).toEqual(["password"]);
      expect(result.error.errors[3].message).toBe("必須です。");
      expect(result.error.errors[3].path).toEqual(["confirmPassword"]);
      expect(result.error.errors[4].message).toBe(
        "パスワードに小文字英字が使用されていません。",
      );
      expect(result.error.errors[4].path).toEqual(["password"]);
      expect(result.error.errors[5].message).toBe(
        "パスワードに大文字英字が使用されていません。",
      );
      expect(result.error.errors[5].path).toEqual(["password"]);
      expect(result.error.errors[6].message).toBe(
        "パスワードに半角数字が使用されていません。",
      );
      expect(result.error.errors[6].path).toEqual(["password"]);
      expect(result.error.errors[7].message).toBe(
        "パスワードに記号が使用されていません。",
      );
      expect(result.error.errors[7].path).toEqual(["password"]);
    }
  });

  it("NG) ユーザー名11桁、パスワード17桁", () => {
    const input: formInput = {
      userName: "ユーザー名123456", // 11桁
      password: "1234567890..AAaa!", // 17桁
      confirmPassword: "1234567890..AAaa!",
    };
    const result = LoginFormSchema.safeParse(input);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors.length).toBe(2);
      expect(result.error.errors[0].message).toBe("最大10文字までです。");
      expect(result.error.errors[0].path).toEqual(["userName"]);
      expect(result.error.errors[1].message).toBe(
        "英字,数字,記号(._!+^&)を組み合わせた12~16文字で入力してください。",
      );
      expect(result.error.errors[1].path).toEqual(["password"]);
    }
  });

  it("NG) パスワード不一致、桁数11桁", () => {
    const input: formInput = {
      userName: "ユーザー名",
      password: "12345678aA.", // 11桁
      confirmPassword: "1234567890..AAaa!",
    };
    const result = LoginFormSchema.safeParse(input);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors.length).toBe(2);
      expect(result.error.errors[0].message).toBe(
        "英字,数字,記号(._!+^&)を組み合わせた12~16文字で入力してください。",
      );
      expect(result.error.errors[0].path).toEqual(["password"]);
      expect(result.error.errors[1].message).toBe("パスワードと一致しません。");
      expect(result.error.errors[1].path).toEqual(["confirmPassword"]);
    }
  });

  it("NG) パスワード 小文字アルファベット未使用", () => {
    const input: formInput = {
      userName: "ユーザー名",
      password: "1234567890A.", // 12桁
      confirmPassword: "1234567890A.",
    };
    const result = LoginFormSchema.safeParse(input);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors.length).toBe(1);
      expect(result.error.errors[0].message).toBe(
        "パスワードに小文字英字が使用されていません。",
      );
      expect(result.error.errors[0].path).toEqual(["password"]);
    }
  });

  it("NG) パスワード 大文字アルファベット未使用", () => {
    const input: formInput = {
      userName: "ユーザー名",
      password: "1234567890a.", // 12桁
      confirmPassword: "1234567890a.",
    };
    const result = LoginFormSchema.safeParse(input);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors.length).toBe(1);
      expect(result.error.errors[0].message).toBe(
        "パスワードに大文字英字が使用されていません。",
      );
      expect(result.error.errors[0].path).toEqual(["password"]);
    }
  });

  it("NG) パスワード 数字未使用", () => {
    const input: formInput = {
      userName: "ユーザー名",
      password: "Abudefghij..", // 12桁
      confirmPassword: "Abudefghij..",
    };
    const result = LoginFormSchema.safeParse(input);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors.length).toBe(1);
      expect(result.error.errors[0].message).toBe(
        "パスワードに半角数字が使用されていません。",
      );
      expect(result.error.errors[0].path).toEqual(["password"]);
    }
  });

  it("NG) パスワード 記号未使用", () => {
    const input: formInput = {
      userName: "ユーザー名",
      password: "Aa1234567890", // 12桁
      confirmPassword: "Aa1234567890",
    };
    const result = LoginFormSchema.safeParse(input);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors.length).toBe(1);
      expect(result.error.errors[0].message).toBe(
        "パスワードに記号が使用されていません。",
      );
      expect(result.error.errors[0].path).toEqual(["password"]);
    }
  });
});
