import React from "react";

interface SubmitButtonProps {
  title: string;
}

/**
 * ログイン画面 ログインボタン
 *
 * @param {object} SubmitButtonProps
 * @param {string} - SubmitButtonProps.title ボタン名
 * @returns {JSX.Element}
 */
const SubmitButton: React.FC<SubmitButtonProps> = (prop) => {
  return (
    <>
      <button
        className="login-button"
        type="submit"
      >
        {prop.title}
      </button>
    </>
  );
};

export default SubmitButton;
