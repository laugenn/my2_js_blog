import { describe, expect, it } from "vitest";
import { sanitizeSpecialChars } from "../../../server/utils/stringUtils";

describe("sanitizeSpecialChars", () => {
  it("全記号 半角→全角", () => {
    const input = "!#$%^&*()_+={}[]:;\"'<>,.?/\\|`~";
    const expected =
      "！＃＄％＾＆＊（）＿＋＝｛｝［］：；“’＜＞，．？／＼｜｀～";
    expect(sanitizeSpecialChars(input)).toBe(expected);
  });

  it("全記号 全角→全角", () => {
    const input = "！＃＄％＾＆＊（）＿＋＝｛｝［］：；“’＜＞，．？／＼｜｀～";
    const expected =
      "！＃＄％＾＆＊（）＿＋＝｛｝［］：；“’＜＞，．？／＼｜｀～";
    expect(sanitizeSpecialChars(input)).toBe(expected);
  });

  it("記号なし", () => {
    const input = "あｲ0ジュ日Dy";
    const expected = "あｲ0ジュ日Dy";
    expect(sanitizeSpecialChars(input)).toBe(expected);
  });

  it("記号混じり", () => {
    const input = "あ0.日!Dy";
    const expected = "あ0．日！Dy";
    expect(sanitizeSpecialChars(input)).toBe(expected);
  });
});
