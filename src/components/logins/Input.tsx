import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputLoginProps {
  labelName: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  errors: FieldError | undefined;
}

/**
 * ログイン画面 inputタグ(name, password, confirmPassword)
 *
 * @param {Object} props: InputLoginProps
 * @param {string} props.labelName: ラベル名
 * @param {string} props.type: inputタグのtype属性の値
 * @param {string} props.placeholder: inputタグのplaceholder属性の値
 * @param {UseFormRegisterReturn<string>} props.register: useFormで管理する文字列
 * @param {FieldError | undefined} props.errors: useFormで定義しているプロパティ名(Error)
 * @returns {JSX.Element}
 */
const InputLogin: React.FC<InputLoginProps> = (props) => {
  return (
    <div className="login-box">
      <label>{props.labelName}：</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="login-input"
        {...props.register}
      />

      {props.labelName == "パスワード" && !props.errors?.message && (
        <p>
          右記の文字を組み合わせてください：大文字小文字英字,数字,記号(._!+^&)
        </p>
      )}

      {props.errors?.message && (
        <p className="login-error-message">{props.errors?.message}</p>
      )}
    </div>
  );
};

export default InputLogin;
