import axios from "axios";
import { InputsSignIn } from "../pages/SignIn";
import { InputsSignUp } from "../pages/SignUp";

const URL = "http://localhost:8080/api/login";

export const loginApi = {
  // 主キー検索
  async getByUserName(_userName: string) {
    const data = await axios.get(URL + "?username=" + _userName);
    return data;
  },

  // 新規登録
  async postSignUp(_input: InputsSignUp) {
    const data = await axios.post(URL + "/signup", _input);
    return data;
  },

  // ログイン
  async postSignIn(_input: InputsSignIn) {
    const data = await axios.post(URL + "/signin", _input);
    return data;
  },
};
