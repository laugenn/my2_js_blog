import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { contentApi } from "../apis/content";
import { loginApi } from "../apis/login";
import { useContentDispatch } from "../contexts/ContentProvider";
import { ContentsProviderActions, FrontMessages } from "../enums/Enum";
import { InputsEditProfile } from "../pages/EditProfile";
import { Inputs } from "../pages/Form";
import { InputsSignIn } from "../pages/SignIn";
import { InputsSignUp } from "../pages/SignUp";

/**
 * 追加・更新画面で使用する画像プレビューと操作を管理するカスタムフック
 * @param {UseFormSetValue<Inputs>} setValue useFormの戻り値
 * @param {UseFormResetField<Inputs>} resetField useFormの戻り値
 * @param {File | null} selectedFile アップロード画像(state)
 * @param {React.Dispatch<React.SetStateAction<File | null>>} setSelectedFile アップロード画像(state関数)
 * @param {number} maxSize 1048576(固定値 1MB)
 *
 * @returns {(e: React.ChangeEvent<HTMLInputElement>) => } return.onChangeContentType: コンテンツタイプの変更処理
 * @returns {() => void} return.onClickClearImg: 画像取り消し押下処理
 * @returns {string} return.previewImgSrc: プレビュー画像のURL(state)
 * @returns {React.Dispatch<React.SetStateAction<string>>} return.setPreviewImgSrc: プレビュー画像のURLの更新state関数
 * @returns {boolean} return.isClickPreview: 画像を押下しプレビュー状態かどうか
 * @returns {() => void} return.onClickPreview: 画像を押下処理
 * @returns {React.Dispatch<React.SetStateAction<string>>} return.createdFileName: 画像ファイル名の更新state関数
 *
 */
export const useFormHandlers = (
  setValue: UseFormSetValue<Inputs>,
  resetField: UseFormResetField<Inputs>,
  selectedFile: File | null,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  maxSize = 1048576, // 1 * 1024 * 1024 (1MB)
) => {
  // state
  const [previewImgSrc, setPreviewImgSrc] = useState<string>("");
  const [isClickPreview, setIsClickPreview] = useState<boolean>(false);
  const [createdFileName, setCreatedFileName] = useState<string>("");

  // アップロード画像の変更時に発火
  useEffect(() => {
    if (!selectedFile) {
      setPreviewImgSrc("");
      setCreatedFileName("");
      return;
    }

    // 以前のオブジェクトURLを解放
    URL.revokeObjectURL(previewImgSrc);

    // ファイルサイズチェック(acceptで形式は絞込み済みのためサイズのみ)
    if (selectedFile.size > maxSize) {
      alert(FrontMessages.OK_UPLOAD_FILE_INFO);
      return;
    }

    // プレビュー用のURLを作成
    const imagePreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewImgSrc(imagePreviewUrl);
    setCreatedFileName(selectedFile.name);
  }, [selectedFile]);

  // コンテンツタイプ変更時の処理、画像情報リセット
  const onChangeContentType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue("contentType", e.target.value);
      setPreviewImgSrc("");
      setSelectedFile(null);
    },
    [setValue],
  );

  // プレビュー表示の切り替え
  const onClickPreview = useCallback(() => {
    setIsClickPreview((prev) => !prev);
  }, []);

  // 画像取り消し押下時、画像情報リセット
  const onClickClearImg = useCallback(() => {
    setSelectedFile(null);
    resetField("uploadFile");
    setPreviewImgSrc("");
    setCreatedFileName("");
  }, [resetField]);

  return {
    onChangeContentType,
    onClickClearImg,
    previewImgSrc,
    setPreviewImgSrc,
    isClickPreview,
    onClickPreview,
    createdFileName,
    setCreatedFileName,
  };
};

/**
 * submit処理(API処理を共通化したカスタムフック)
 * @param {UseFormSetError<Inputs>} setError useFormの戻り値
 * @param {string} action 登録(add) or 変更(patch)
 * @param {React.Dispatch<React.SetStateAction<string>>} setResMessage 処理後のメッセージを保持するstate関数
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsLoading 処理中を表示するかどうかのstate関数
 * @param {React.Dispatch<React.SetStateAction<File | null>>} setSelectedFile ファイルが存在するかどうかのstate関数
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsEnd 処理終了かどうかのstate関数
 * @param {UseFormReset<Inputs>} reset useFormの戻り値
 *
 * @returns {Promise<void>} return.onSubmit submit処理(入力データ, 選択したファイル, 編集ID(任意), ファイル名(任意))
 */
export const useOnSubmit = (
  setError: UseFormSetError<Inputs>,
  action: string,
  setResMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  setIsEnd: React.Dispatch<React.SetStateAction<boolean>>,
  reset: UseFormReset<Inputs>,
) => {
  // state更新関数
  const dispatch = useContentDispatch();

  // 戻り値（submit処理)
  const onSubmit = async (
    data: Inputs,
    selectedFile: File | null,
    editID: string = "",
    createdFileName: string = "",
  ): Promise<void> => {
    if (data.contentType != "text" && createdFileName == "") {
      setError("uploadFile", { message: FrontMessages.NOT_EXISTS_UPLOAD_FILE });
      return;
    }

    // 処理開始
    setIsLoading(true);
    // 新規登録の場合
    if (action === "add") {
      contentApi
        .post(data, selectedFile)
        .then((res) => {
          dispatch({
            type: ContentsProviderActions.ADD,
            payload: res.data.data,
          });
          setResMessage(res.data.message);
          reset();
          setSelectedFile(null);
          setIsEnd(true);
        })
        .catch((error) => {
          handleApiCatch(error, setIsEnd);
        })
        .finally(() => {
          handleApiFinally(setIsLoading);
        });
    }

    // 更新の場合
    if (action == "patch") {
      contentApi
        .patchByID(data, selectedFile, editID)
        .then((res) => {
          dispatch({
            type: ContentsProviderActions.PATCH,
            payload: res.data.data,
          });
          setResMessage(res.data.message);
          setIsEnd(true);
        })
        .catch((error: AxiosError | Error) => {
          handleApiCatch(error, setIsEnd);
        })
        .finally(() => {
          handleApiFinally(setIsLoading);
        });
    }
  };
  return { onSubmit };
};

/**
 * apiを実行しstate200以外で返却された場合に行う処理（エラーを表示する）
 * @param {AxiosError | Error} error responseのエラー結果
 * @param {React.Dispatch<React.SetStateAction<boolean>> }setIsEnd 処理終了かどうかのstate関数
 */
const handleApiCatch = (
  error: AxiosError | Error,
  setIsEnd: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  if (error instanceof AxiosError && error.response) {
    const errorObj = error.response.data.errors;
    if (errorObj) {
      Object.entries(errorObj).forEach(([field, message]) => {
        alert(`${field}: ${message}`);
      });
    } else {
      alert(error.response.data.message);
    }
  } else if (error instanceof Error) {
    alert(`${error.message}`);
  }
  setIsEnd(true);
};

/**
 * apiを実行した際の最終処理（画面操作を許可する）
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsLoading 画面操作を許可するかどうかのstate関数
 */
const handleApiFinally = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  setIsLoading(false);
};

/**
 * ログイン画面で「ログイン」ボタン押下時のカスタムフック
 *
 * @returns {number} return.failedLoginCount: ログイン失敗回数
 * @returns {string} return.failedLoginMessage: ログイン失敗メッセージ
 * @returns {(data: InputsSignIn) => Promise<void>} return.onSubmitSignIn: submit処理
 *
 */
export const useSignInOnSubmit = () => {
  // ログイン失敗回数をカウント
  const [failedLoginCount, setFailedLoginCount] = useState<number>(0);
  const [failedLoginMessage, setFailedLoginMessage] = useState<string>("");
  const navigate = useNavigate();

  const onSubmitSignIn = async (data: InputsSignIn) => {
    loginApi
      .postSignIn(data)
      .then(() => {
        setFailedLoginCount(0);
        navigate("/products/all");
      })
      .catch((error) => {
        setFailedLoginCount((prev) => prev + 1);
        if (error.status == 404) {
          setFailedLoginMessage(error.response.data.message);
        } else {
          alert(FrontMessages.FAILED_SIGNIN);
        }
        console.error(error);
      });
  };

  return {
    failedLoginCount,
    failedLoginMessage,
    onSubmitSignIn,
  };
};

/**
 * 新規登録画面カスタムフック
 * @param {UseFormWatch<InputsSignUp>} watch useFormの戻り値
 *
 * @returns {string} return.unUsedNameMessage: API実行時の結果メッセージ
 * @returns {"" | "success" | "error" | "warning"} return.messageType: API実行時の結果メッセージタイプ
 * @returns {(data: InputsSignUp) => Promise<void>} return.onSubmitSignUp: submit処理
 *
 */
export const useSignUp = (watch: UseFormWatch<InputsSignUp>) => {
  // ユーザー名重複させないために監視（1秒後発火）
  const [debouncedUsername] = useDebounce(watch("userName"), 1000);
  // API結果を保持するステート
  const [unUsedNameMessage, setUnUsedNameMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | ""
  >("");
  const navigate = useNavigate();

  useEffect(() => {
    // ユーザー名が未入力の場合、処理終了
    if (!debouncedUsername) {
      setUnUsedNameMessage("");
      setMessageType("");
      return;
    }

    // 入力されたユーザー名をもとにチェックする
    loginApi
      .getByUserName(debouncedUsername)
      .then((res) => {
        const result: boolean = res.data.isData;
        if (result) {
          setUnUsedNameMessage(FrontMessages.USED_USERNAME);
          setMessageType("warning");
        } else {
          setUnUsedNameMessage(FrontMessages.UNUSED_USERNAME);
          setMessageType("success");
        }
      })
      .catch(() => {
        setUnUsedNameMessage(FrontMessages.FAILED_USERNAME_SEARCH);
        setMessageType("error");
      });
  }, [debouncedUsername]);

  const onSubmitSignUp = async (data: InputsSignUp) => {
    if (messageType != "success") {
      return;
    }
    loginApi
      .postSignUp(data)
      .then(() => {
        navigate("/products/all");
      })
      .catch((error) => {
        alert(FrontMessages.FAILED_SIGNUP);
        console.error(error);
      });
  };

  return {
    unUsedNameMessage,
    messageType,
    onSubmitSignUp,
  };
};

/**
 * パスワード登録画面カスタムフック
 *
 * @returns {string} return.errorMessage: API実行時の結果メッセージ
 * @returns {(data: InputsEditProfile) => Promise<void>} return.onSubmitRePassword: submit処理
 *
 */
export const useRePassword = () => {
  // API結果を保持するステート
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const onSubmitRePassword = async (data: InputsEditProfile) => {
    loginApi
      .postRePass(data)
      .then(() => {
        alert(FrontMessages.SUCCESS_RE_PASSWORD);
        navigate("/products/all");
      })
      .catch((error) => {
        if (error.status == 404) {
          setErrorMessage(error.response.data.message);
        } else {
          alert(FrontMessages.FAILED_RE_PASSWORD);
        }
      });
  };

  return {
    errorMessage,
    onSubmitRePassword,
  };
};
