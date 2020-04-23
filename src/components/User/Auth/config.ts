import { Register } from "../Register/Register";
import { Login } from "../Login/Login";

// Types
import { ConfigType } from "./types";

export const config: ConfigType = {
  register: {
    component: Register,
    title: 'Registration'
  },
  login: {
    component: Login,
    title: 'Sigh in'
  }
};