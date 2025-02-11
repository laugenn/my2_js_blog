interface SubmitButtonProps {
  onClick: () => void;
}

/**
 * ログイン画面 ログインボタン
 *
 * @param {Object} props: SubmitButtonProps
 * @param {() => void} props.onClick: クリックイベント
 * @returns {JSX.Element}
 */
const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <>
      <button
        className="login-button"
        onClick={props.onClick}
        type="submit"
      >
        ログイン
      </button>
    </>
  );
};

export default SubmitButton;
