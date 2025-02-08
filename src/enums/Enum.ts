export enum ContentsProviderActions {
  INIT = "init",
  ADD = "add",
  PATCH = "patch",
  DELETE = "delete",
}

export enum FrontMessages {
  REQUIRED = "必須です。",
  NOT_EXISTS_UPLOAD_FILE = "ファイルをアップロードしてください。",
  OK_UPLOAD_FILE_INFO = "PNG, JPG, JPEG形式で1MBまでのファイルのみアップロード可能です。",
  NO_VALUE_CONTENT_TYPE = "コンテンツタイプに登録できない値が選択されています。",

  NOT_EXISTS_ID = "そのIDでは検索できませんでした",
  CONFIRM_DELETE = "削除しますか？",
  SUCCESS_DELETE = "削除完了しました。",
}
