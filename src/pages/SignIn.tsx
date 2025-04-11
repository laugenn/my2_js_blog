import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Input from "../components/logins/Input";
import SubmitButton from "../components/logins/SubmitButton";
import { useSignInOnSubmit } from "../hooks/useFormHandlers";
import { SignInFormSchema } from "../schemas/LoginForm";

export interface InputsSignIn {
  userName: string;
  password: string;
}

/**
 * ログイン画面
 *
 * @returns {JSX.Element}
 */
const SignIn: React.FC = () => {
  const form = useForm<InputsSignIn>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const { failedLoginCount, failedLoginMessage, onSubmitSignIn } =
    useSignInOnSubmit();

  return (
    <div className="login">
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmitSignIn(data);
        })}
      >
        <div className="position-center">
          <h2>ログイン</h2>
          <Input
            labelName="ユーザー名"
            type="text"
            placeholder="登録したユーザー名を入力してください"
            register={form.register("userName")}
            errors={form.formState.errors.userName}
          />

          <Input
            labelName="パスワード"
            type="password"
            placeholder="登録したパスワードを入力してください"
            register={form.register("password")}
            errors={form.formState.errors.password}
          />

          {failedLoginMessage ? (
            <p className="login-error-message">{failedLoginMessage}</p>
          ) : (
            ""
          )}

          {failedLoginCount < 5 ? (
            <>
              <SubmitButton title="ログイン" />
              <Link to={"/login/account"}>アカウント情報の変更</Link>
            </>
          ) : (
            <p>5回連続で失敗しましたので画面を閉じてください</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
