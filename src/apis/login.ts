import axios from "axios";
import { InputLogin } from "../components/logins/Input";

const URL = "http://localhost:8080/api/login";

export const loginApi = {
  // 主キー検索
  async getByUserName(_userName: string) {
    const data = await axios.get(URL + "?username=" + _userName);
    return data;
  },

  // 登録
  async post(_input: InputLogin) {
    const data = await axios.post(URL, _input);
    return data;
  },
};
