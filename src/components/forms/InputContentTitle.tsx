import { FieldErrors, UseFormRegister } from "react-hook-form";
import React from "react";

import { Inputs } from "../../pages/Form";

interface InputContentTitleProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}

/**
 * タイトル入力欄
 *
 * @param {Object} props: InputContentTitleProps
 * @param {UseFormRegister<Inputs>} props.register: useForm戻り値
 * @param {FieldErrors<Inputs>} props.errors: useForm戻り値
 * @returns {JSX.Element}
 */
const InputContentTitle: React.FC<InputContentTitleProps> = (props) => {
  return (
    <>
      <div>
        <label>
          タイトル<span className="required">*</span>：
        </label>
        <input
          type="text"
          maxLength={20}
          size={30}
          {...props.register("title")}
        />
      </div>
      <div className="error">
        {props.errors.title && <span>{props.errors.title.message}</span>}
      </div>
      <br />
    </>
  );
};

export default InputContentTitle;
