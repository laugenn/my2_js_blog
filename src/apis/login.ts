import axios from "axios";
import { InputsEditProfile } from "../pages/EditProfile";
import { InputsSignIn } from "../pages/SignIn";
import { InputsSignUp } from "../pages/SignUp";

const URL = "http://localhost:8080/api/login";

export const loginApi = {
  // 主キー検索
  async getByUserName(_userName: string) {
    const data = await axios.get(URL + "?username=" + _userName);
    return data;
  },

  // セッション情報を取得
  async getSession() {
    const data = await axios.get(URL + "/session", {
      withCredentials: true,
    });
    return data;
  },

  // 新規登録
  async postSignUp(_input: InputsSignUp) {
    const data = await axios.post(URL + "/signup", _input, {
      withCredentials: true,
    });
    return data;
  },

  // ログイン
  async postSignIn(_input: InputsSignIn) {
    const data = await axios.post(URL + "/signin", _input, {
      withCredentials: true,
    });
    return data;
  },

  // パスワード変更
  async postRePass(_input: InputsEditProfile) {
    const data = await axios.post(URL + "/repass", _input, {
      withCredentials: true,
    });
    return data;
  },

  // ログアウト
  async destroySession() {
    const data = await axios.post(URL + "/logout", {
      withCredentials: true,
    });
    return data;
  },
};
