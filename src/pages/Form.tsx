import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  InputContentComment,
  InputContentFile,
  InputContentTitle,
  InputContentType,
  SubmitButton,
} from "../components/forms/Index";
import {
  useFormHandlers,
  useOnSubmit,
  useSessionLoginCheck,
} from "../hooks/useFormHandlers";
import { ContentFormSchema } from "../schemas/contentForm";

export interface Inputs {
  _id: string;
  title: string;
  contentType: string;
  uploadFile: File | null;
  uploadFileName: string | null;
  uploadFileMineType: string | null;
  comment: string;
}

/**
 * サイドバーの「追加」を押下した際に表示する画面
 * コンテンツ追加画面
 *
 * @returns {JSX.Element}
 */
const Form: React.FC = () => {
  // ログイン認可チェック
  useSessionLoginCheck();
  // useFormの設定
  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    setValue,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(ContentFormSchema),
    defaultValues: {
      title: "",
      contentType: "text",
      comment: "",
    },
  });

  // アップロードファイル
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // レスポンスメッセージ
  const [resMessage, setResMessage] = useState<string>("");
  // 処理終了かどうか
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 登録ボタン押下時(カスタムフック)
  const { onSubmit } = useOnSubmit(
    setError,
    "add",
    setResMessage,
    setIsLoading,
    setSelectedFile,
    setIsEnd,
    reset,
  );
  // 各種ハンドラ系
  const {
    onChangeContentType,
    onClickClearImg,
    previewImgSrc,
    setPreviewImgSrc,
    isClickPreview,
    onClickPreview,
    createdFileName,
    setCreatedFileName,
  } = useFormHandlers(setValue, resetField, selectedFile, setSelectedFile);

  return (
    <div className="form">
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, selectedFile, "", createdFileName),
        )}
        encType="multipart/form-data"
      >
        <h2>登録内容</h2>

        {/* 登録完了の場合、メッセージを表示する */}
        {isEnd && <p className="success-message">{resMessage}</p>}

        {/* タイトル */}
        <InputContentTitle
          register={register}
          errors={errors}
        />

        {/* タイプ */}
        <InputContentType
          register={register}
          watch={watch}
          errors={errors}
          onChange={onChangeContentType}
        />

        {/* 写真 */}
        <InputContentFile
          register={register}
          errors={errors}
          getValue={getValues}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onClickPreview={onClickPreview}
          isClickPreview={isClickPreview}
          imagePreviewUrl={previewImgSrc}
          createdFileName={createdFileName}
          onClickClearImg={onClickClearImg}
        />

        {/* コメント  */}
        <InputContentComment
          register={register}
          errors={errors}
        />

        {/* 登録ボタン  */}
        {isLoading ? (
          <p>登録中</p>
        ) : (
          <>
            <SubmitButton title="登録する" />
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
