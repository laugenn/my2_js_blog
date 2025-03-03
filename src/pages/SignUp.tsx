import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Input from "../components/logins/Input";
import SubmitButton from "../components/logins/SubmitButton";
import { useSignUp } from "../hooks/useFormHandlers";
import { SignUpFormSchema } from "../schemas/LoginForm";

export interface InputsSignUp {
  userName: string;
  password: string;
  confirmPassword: string;
}

/**
 * 新規登録画面
 * @returns {JSX.Element}
 */
const SignUp: React.FC = () => {
  const form = useForm<InputsSignUp>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { unUsedNameMessage, messageType, onSubmitSignUp } = useSignUp(
    form.watch,
  );

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmitSignUp(data);
        })}
      >
        <div className="login-wrapper">
          <h2>新規登録</h2>
          <Input
            labelName="ユーザー名"
            type="text"
            placeholder="ユーザー名を入力してください"
            register={form.register("userName")}
            errors={form.formState.errors.userName}
          />

          {/* ユーザー検索後のメッセージ表示欄 */}
          {unUsedNameMessage && (
            <p
              className={`username-message ${
                messageType == "success"
                  ? "success"
                  : messageType == "error"
                    ? "error"
                    : messageType == "warning"
                      ? "warning"
                      : ""
              }`}
            >
              {unUsedNameMessage}
            </p>
          )}

          <Input
            labelName="パスワード"
            type="password"
            placeholder="12~16文字でパスワードを入力してください"
            register={form.register("password")}
            errors={form.formState.errors.password}
          />
          <Input
            labelName="パスワード確認用"
            type="password"
            placeholder="パスワードと同じ値を入力してください"
            register={form.register("confirmPassword")}
            errors={form.formState.errors.confirmPassword}
          />

          <SubmitButton title="登録" />
          <Link to={"/login/signin"}>すでに登録済みの方</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
