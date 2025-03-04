import { Box, Typography } from "@mui/material";
import React from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";

import { Inputs } from "../../pages/Form";

interface InputContentFileProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  getValue: UseFormGetValues<Inputs>;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  onClickPreview: () => void;
  isClickPreview: boolean;
  imagePreviewUrl: string;
  createdFileName: string;
  onClickClearImg: () => void;
}

/**
 * ファイル入力欄
 *
 * @param {Object} props: InputContentFileProps
 * @param {UseFormRegister<Inputs>} props.register: useForm戻り値
 * @param {FieldErrors<Inputs>} props.errors: useForm戻り値
 * @param {UseFormGetValues<Inputs>} props.getValue: useForm戻り値
 * @param {File | null} props.selectedFile: ユーザーがアップロードした画像(state)
 * @param {React.Dispatch<React.SetStateAction<File | null>>} props.setSelectedFile: selectedFileのstate更新関数
 * @param {() => void} props.onClickPreview: 画像を押下したときのイベントハンドラ（関数)
 * @param {boolean} props.isClickPreview: 画像を押下したかどうか(state)
 * @param {string} props.imagePreviewUrl: 画像のURL(state)
 * @param {string} props.createdFileName: アップロードされた画像のファイル名(state)
 * @param {() => void} props.onClickClearImg: 画像の取り消し押下したときのイベントハンドラ（関数）
 * @returns {JSX.Element}
 */
const InputContentFile: React.FC<InputContentFileProps> = (props) => {
  // 選択しているコンテンツタイプ
  const selectedContentType = props.getValue("contentType");
  // 選択しているコンテンツタイプによって切り替え
  const renderInput = (selectedContentType: string) => {
    switch (selectedContentType) {
      case "text": {
        return null;
      }
      case "image": {
        return (
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            {...props.register("uploadFile")}
            onChange={(e) => {
              props.setSelectedFile(e.target.files?.[0] ?? null);
            }}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  // 画像情報がある場合、画像と画像取り消しボタンを表示する
  const renderImg = () => {
    if (props.selectedFile || props.imagePreviewUrl != "") {
      return (
        <>
          <div
            onClick={props.onClickPreview}
            className={`image-container ${props.isClickPreview ? "enlarged" : ""}`}
          >
            <Box
              component="img"
              sx={{
                height: 500,
                width: 500,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="Preview"
              src={props.imagePreviewUrl}
            />

            {props.createdFileName != "" ? (
              <Typography
                variant="body2"
                sx={{ mt: 1, wordBreak: "break-all" }}
              >
                ファイル名：{props.createdFileName}
              </Typography>
            ) : null}
          </div>
          <button onClick={props.onClickClearImg}>画像取り消し</button>
        </>
      );
    }
  };

  return (
    <>
      <div>
        {/* コンテンツがテキスト以外の場合、ファイル欄を表示 */}
        {selectedContentType != "text" && (
          <>
            <label>写真：</label>
            {renderInput(selectedContentType)}
          </>
        )}

        {/* 写真が登録されている場合、プレビューを表示 */}
        {renderImg()}
      </div>
      <div className="error">
        {props.errors.uploadFile && (
          <span>{props.errors.uploadFile.message}</span>
        )}
      </div>
      <br />
    </>
  );
};

export default InputContentFile;
