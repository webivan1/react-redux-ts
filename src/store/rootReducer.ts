import { combineReducers } from "@reduxjs/toolkit";

import { todoList, todoDetail } from "./todo";
import { register, user } from "./user";

export default combineReducers({
  user,
  register,
  todoList,
  todoDetail,
});