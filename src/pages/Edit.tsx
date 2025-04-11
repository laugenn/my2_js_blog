import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { contentApi } from "../apis/content";
import {
  InputContentComment,
  InputContentFile,
  InputContentTitle,
  InputContentType,
  SubmitButton,
} from "../components/forms/Index";
import { FrontMessages } from "../enums/Enum";
import { useFormHandlers, useOnSubmit } from "../hooks/useFormHandlers";
import { ContentFormSchema } from "../schemas/contentForm";
import { Inputs } from "./Form";

/**
 * コンテンツ単体の「編集」ボタンを押した際の画面
 * コンテンツ編集画面
 *
 * @returns {JSX.Element}
 */
const Edit: React.FC = () => {
  // URLパラメータ取得
  const { editID } = useParams();
  // 存在するidかどうか
  const [hasEditID, setHasEditID] = useState<boolean>(true);
  // アップロードされたファイル
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // パラメータのidでヒットしなかった場合のメッセージ
  const [errorMessage, setErrorMessage] = useState<string>(
    FrontMessages.NOT_EXISTS_ID,
  );
  // レスポンスメッセージ
  const [resMessage, setResMessage] = useState<string>("");
  // 処理終了かどうか
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useFormの設定
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    resetField,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(ContentFormSchema),
  });

  // 登録ボタン押下時(カスタムフック)
  const { onSubmit } = useOnSubmit(
    setError,
    "patch",
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

  // 初回のみ
  useEffect(() => {
    // 未定義の場合、処理終了
    if (!editID) {
      setHasEditID(false);
      return;
    }
    // 主キー検索
    contentApi
      .getByID(editID)
      .then((res) => {
        reset(res.data);
        updatePreviewImage();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }, []);

  // DBから取得した画像情報をもとに画面に反映する
  const updatePreviewImage = () => {
    const fileData = getValues("uploadFile");
    const fileFileName = getValues("uploadFileName");
    const fileMineType = getValues("uploadFileMineType");
    if (fileData && fileMineType && fileFileName) {
      setPreviewImgSrc(`data:${fileMineType};base64,${fileData}`);
      setCreatedFileName(fileFileName);
    }
  };

  return (
    <div className="form">
      {!hasEditID ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data, selectedFile, editID, createdFileName);
            })}
            encType="multipart/form-data"
          >
            <h2>編集画面</h2>
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
              <p>更新中</p>
            ) : (
              <>
                <SubmitButton title="更新する" />
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
