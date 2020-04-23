import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { UserModelType, UserType } from "../types";
import * as userAction from "./actions";

const initialState: UserType = {
  user: false
};

export default createReducer(initialState, {
  [userAction.signIn.type]: (state: UserType, action: PayloadAction<UserModelType>): void => {
    state.user = action.payload;
  },
  [userAction.logout.type]: (state: UserType): void => {
    state.user = false;
  },
  [userAction.autoLogin.type]: (state: UserType, action: PayloadAction<UserModelType>): void => {
    state.user = action.payload;
  }
});