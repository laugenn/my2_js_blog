import axios from "axios";
import { Inputs } from "../pages/Form";

const URL = "http://localhost:8080/api/content";

export const contentApi = {
  // 主キー検索
  async getByID(_id: string) {
    const data = await axios.get(URL + "/" + _id);
    return data;
  },

  // 全体検索
  async getAll() {
    const data = await axios.get(URL + "/all");
    return data;
  },

  // 登録
  async post(input: Inputs, fileData: File | null) {
    // データ
    const postData = new FormData();
    postData.append("title", input.title);
    postData.append("contentType", input.contentType);
    postData.append("comment", input.comment);
    // 画像データがある場合、格納
    if (fileData) {
      postData.append("uploadFile", fileData);
    }
    const data = await axios.post(URL, postData);
    return data;
  },

  // 主キー更新
  async patchByID(input: Inputs, fileData: File | null, id: string) {
    // データ
    const postData = new FormData();
    postData.append("title", input.title);
    postData.append("contentType", input.contentType);
    postData.append("comment", input.comment);
    // 画像データがある場合、格納
    if (fileData) {
      postData.append("uploadFile", fileData);
    }
    const data = await axios.patch(URL + "/" + id, postData);
    return data;
  },

  // 主キー削除
  async deleteByID(id: string) {
    const data = await axios.delete(URL + "/" + id);
    return data;
  },
};
