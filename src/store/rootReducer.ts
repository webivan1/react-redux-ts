import { combineReducers } from "@reduxjs/toolkit";

import { todoList, todoDetail, todoCreate } from "./todo";
import { register, login, user } from "./user";

export default combineReducers({
  user,
  register,
  login,
  todoList,
  todoCreate,
  todoDetail,
});