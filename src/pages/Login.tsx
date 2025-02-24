import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { loginApi } from "../apis/login";
import Input from "../components/logins/Input";
import SubmitButton from "../components/logins/SubmitButton";
import { useLoginFailCounter } from "../hooks/useFormHandlers";
import { LoginFormSchema } from "../schemas/LoginForm";

interface InputsLogin {
  userName: string;
  password: string;
  confirmPassword: string;
}

/**
 * ログイン画面
 * @returns {JSX.Element}
 */
const Login: React.FC = () => {
  const form = useForm<InputsLogin>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { failedLoginCount, onClickLogin } = useLoginFailCounter(
    form.formState.isValid,
  );
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        onSubmit={form.handleSubmit((data) => {
          loginApi
            .post(data)
            .then(() => {
              navigate("/products/all");
            })
            .catch((error) => {
              console.error(error);
            });
        })}
      >
        <div className="login-wrapper">
          <h2>ログイン</h2>
          <Input
            labelName="ユーザー名"
            type="text"
            placeholder="ユーザー名を入力してください"
            register={form.register("userName")}
            errors={form.formState.errors.userName}
          />
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

          {failedLoginCount < 5 ? (
            <SubmitButton onClick={onClickLogin} />
          ) : (
            <p>5回連続で失敗しましたので画面を閉じてください</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
