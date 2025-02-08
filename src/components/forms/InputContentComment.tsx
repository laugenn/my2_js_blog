import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Inputs } from "../../pages/Form";

interface InputContentCommentProps {
  marginTop: string;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

/**
 * コメント入力欄
 *
 * @param {Object} props: InputContentCommentProps
 * @param {string} props.marginTop: 画像の押下した際に余白を変更
 * @param {UseFormRegister<Inputs>} props.register: useForm戻り値
 * @param {FieldErrors<Inputs>} props.errors: useForm戻り値
 * @returns {JSX.Element}
 */
const InputContentComment: React.FC<InputContentCommentProps> = (props) => {
  return (
    <>
      <div style={{ marginTop: props.marginTop }}>
        <label>
          コメント<span className="required">*</span>：
        </label>
        <textarea
          {...props.register("comment")}
          style={{ position: "absolute" }}
          cols={30}
          rows={3}
        />
      </div>
      <div className="error">
        {props.errors.comment && <span>{props.errors.comment.message}</span>}
      </div>
      <br />
    </>
  );
};

export default InputContentComment;
