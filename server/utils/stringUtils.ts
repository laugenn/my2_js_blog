/**
 * 入力文字のサニタイズ対応
 * 特殊記号を半角から全角に変換する
 *
 * @param {string} input - ユーザー入力値
 * @returns {string} サニタイズ対応後の入力値
 */
export const sanitizeSpecialChars = (input: string): string => {
  const hanSymbols = [
    "!",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "=",
    "{",
    "}",
    "[",
    "]",
    ":",
    ";",
    '"',
    "'",
    "<",
    ">",
    ",",
    ".",
    "?",
    "/",
    "\\",
    "|",
    "`",
    "~",
  ];
  const zenSymbols = [
    "！",
    "＃",
    "＄",
    "％",
    "＾",
    "＆",
    "＊",
    "（",
    "）",
    "＿",
    "＋",
    "＝",
    "｛",
    "｝",
    "［",
    "］",
    "：",
    "；",
    "“",
    "’",
    "＜",
    "＞",
    "，",
    "．",
    "？",
    "／",
    "＼",
    "｜",
    "｀",
    "～",
  ];

  // 戻り値
  let result = "";
  for (const char of input) {
    const index = hanSymbols.indexOf(char);
    if (index != -1) {
      result += zenSymbols[index]; // 見つかった場合、全角記号に変換
    } else {
      result += char; // 見つからなかった場合、そのまま追加
    }
  }
  return result;
};
