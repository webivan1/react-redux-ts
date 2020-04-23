import { combineReducers } from "@reduxjs/toolkit";

import { todoList, todoDetail } from "./todo";
import { register, login, user } from "./user";

export default combineReducers({
  user,
  register,
  login,
  todoList,
  todoDetail,
});