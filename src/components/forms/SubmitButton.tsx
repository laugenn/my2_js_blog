import React from "react";

interface SubmitButtonProps {
  title: string;
}

/**
 * submitボタン
 *
 * @param {Object} props: SubmitButtonProps
 * @param {string} props.title: ボタンvalue値
 * @returns {JSX.Element}
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({ title }) => {
  return (
    <>
      <input
        type="submit"
        value={title}
      />
    </>
  );
};
export default SubmitButton;
