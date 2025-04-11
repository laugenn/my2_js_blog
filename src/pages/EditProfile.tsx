import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/logins/Input";
import SubmitButton from "../components/logins/SubmitButton";
import { useRePassword } from "../hooks/useFormHandlers";
import { rePasswordFormSchema } from "../schemas/LoginForm";

export interface InputsEditProfile {
  userName: string;
  password: string;
  rePassword: string;
  confirmPassword: string;
}

/**
 * パスワード変更画面
 *
 * @returns {JSX.Element}
 */
const EditProfile: React.FC = () => {
  const form = useForm<InputsEditProfile>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(rePasswordFormSchema),
  });

  const { errorMessage, onSubmitRePassword } = useRePassword();

  return (
    <div className="login">
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmitRePassword(data);
        })}
      >
        <div className="position-center">
          <h2>パスワード変更画面</h2>
          <Input
            labelName="ユーザー名"
            type="text"
            placeholder="登録したユーザー名を入力してください"
            register={form.register("userName")}
            errors={form.formState.errors.userName}
          />

          <Input
            labelName="前回パスワード"
            type="password"
            placeholder="登録済みのパスワードを入力してください"
            register={form.register("password")}
            errors={form.formState.errors.password}
          />
          <Input
            labelName="新しいパスワード"
            type="password"
            placeholder="新しいパスワードを入力してください"
            register={form.register("rePassword")}
            errors={form.formState.errors.rePassword}
          />
          <Input
            labelName="新しいパスワード（確認用）"
            type="password"
            placeholder="再度新しいパスワードを入力してください"
            register={form.register("confirmPassword")}
            errors={form.formState.errors.confirmPassword}
          />
          <SubmitButton title="変更する" />

          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
