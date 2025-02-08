export enum ServerMessages {
  // 200
  SUCCESS_CREATE = "登録完了しました。",
  SUCCESS_UPDATE = "更新完了しました。",
  SUCCESS_DELETE = "削除完了しました。",

  // 400
  FAIL_UPLOAD = "アップロードされた画像は登録できませんでした。",
  FAIL_UPLOAD_MINE_TYPE = "PNG, JPG, JPEG形式のみアップロード可能です。",
  FAIL_UPLOAD_SIZE_OVER = "ファイルサイズは1MBまでです。",
  NOT_FOUND = "指定されたURLは存在しません。",
  NO_DATA_GET_BY_ID = "主キー検索でヒットしませんでした。",
  UPDATE_NO_DATA = "更新対象が存在しませんでした。",
  DELETE_NO_DATA = "削除対象が存在しませんでした。",

  //500
  INTERNAL_SERVER_ERROR = "サーバー内部エラーが発生しました。",
}
