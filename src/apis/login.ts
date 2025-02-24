import axios from "axios";
import { InputLogin } from "../components/logins/Input";

const URL = "http://localhost:8080/api/login";

export const loginApi = {
  // 登録
  async post(_input: InputLogin) {
    const data = await axios.post(URL, _input);
    return data;
  },
};
