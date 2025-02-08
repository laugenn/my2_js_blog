import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { Inputs } from "../../pages/Form";

interface InputContentTypeProps {
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
  errors: FieldErrors<Inputs>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * コンテンツタイプ選択欄
 *
 * @param {Object} props: InputContentTypeProps
 * @param {UseFormRegister<Inputs>} props.register: useForm戻り値
 * @param {UseFormWatch<Inputs>} props.watch: useForm戻り値
 * @param {FieldErrors<Inputs>} props.errors: useForm戻り値
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} props.onChange: チェンジイベント（関数)
 * @returns {JSX.Element}
 */
const InputContentType: React.FC<InputContentTypeProps> = (props) => {
  return (
    <>
      <div>
        <label>
          コンテンツタイプ<span className="required">*</span>：
        </label>
        <input
          id="text"
          type="radio"
          {...props.register("contentType")}
          value="text"
          checked={props.watch("contentType") == "text"}
          onChange={props.onChange}
        />
        <label htmlFor="text">テキスト</label>
        <input
          id="image"
          type="radio"
          {...props.register("contentType")}
          value="image"
          checked={props.watch("contentType") == "image"}
          onChange={props.onChange}
        />
        <label htmlFor="image">写真</label>
      </div>
      <div className="error">
        {props.errors.contentType && (
          <span>{props.errors.contentType.message}</span>
        )}
      </div>
    </>
  );
};

export default InputContentType;
