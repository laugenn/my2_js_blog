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

  PASS_REGEX_MESSAGE = "英字,数字,記号(._!+^&)を組み合わせた12~16文字で入力してください。",
  PASS_REGEX_NO_SMALL_ALF = "パスワードに小文字英字が使用されていません。",
  PASS_REGEX_NO_BIG_ALF = "パスワードに大文字英字が使用されていません。",
  PASS_REGEX_NO_NUM = "パスワードに半角数字が使用されていません。",
  PASS_REGEX_NO_SYMBOL = "パスワードに記号が使用されていません。",
  PASS_MISMATCH = "パスワードと一致しません。",
  NO_CHANGE_PASS = "前回パスワードと変わりがありません。",

  NOT_EXISTS_ID = "そのIDでは検索できませんでした",
  CONFIRM_DELETE = "削除しますか？",
  SUCCESS_DELETE = "削除完了しました。",
  SUCCESS_RE_PASSWORD = "パスワードの更新完了しました。",

  USED_USERNAME = "既に使用されているユーザー名です。",
  UNUSED_USERNAME = "登録可能なユーザー名です。",
  FAILED_USERNAME_SEARCH = "ユーザー検索を失敗しました。",

  FAILED_SIGNUP = "新規登録に失敗しました。",
  FAILED_SIGNIN = "ログインに失敗しました。",
  FAILED_RE_PASSWORD = "パスワードの更新に失敗しました。",
}
