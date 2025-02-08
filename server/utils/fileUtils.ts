import iconv from "iconv-lite";

/**
 * ファイル名の文字化け対応
 *
 * @param {string} fileName - アップロードされたファイル名
 * @returns {string} utf-8に変換後ファイル名
 */
export const safeFileName = (fileName: string): string => {
  return iconv.decode(Buffer.from(fileName, "binary"), "utf-8");
};
