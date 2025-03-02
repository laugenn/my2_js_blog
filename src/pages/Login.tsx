import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { loginApi } from "../apis/login";
import Input from "../components/logins/Input";
import SubmitButton from "../components/logins/SubmitButton";
import { FrontMessages } from "../enums/Enum";
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
  // ユーザー名重複させないために監視（1秒後発火）
  const [debouncedUsername] = useDebounce(form.watch("userName"), 1000);
  // API結果を保持するステート
  const [unUsedNameMessage, setUnUsedNameMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | ""
  >("");

  useEffect(() => {
    // ユーザー名が未入力の場合、処理終了
    if (!debouncedUsername) {
      setUnUsedNameMessage("");
      setMessageType("");
      return;
    }

    // 入力されたユーザー名をもとにチェックする
    loginApi
      .getByUserName(debouncedUsername)
      .then((res) => {
        const result: boolean = res.data.isData;
        if (result) {
          setUnUsedNameMessage(FrontMessages.USED_USERNAME);
          setMessageType("warning");
        } else {
          setUnUsedNameMessage(FrontMessages.UNUSED_USERNAME);
          setMessageType("success");
        }
      })
      .catch(() => {
        setUnUsedNameMessage(FrontMessages.FAILED_USERNAME_SEARCH);
        setMessageType("error");
      });
  }, [debouncedUsername]);

  const { failedLoginCount, onClickLogin } = useLoginFailCounter(
    form.formState.isValid,
  );
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (messageType != "success") {
            return;
          }
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
