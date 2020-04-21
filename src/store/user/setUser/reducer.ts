import Cookies from "js-cookie";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { UserModelType, UserType } from "../types";
import * as userAction from "./actions";

const initialState: UserType = {
  user: false
};

export default createReducer(initialState, {
  [userAction.signIn.type]: (state: UserType, action: PayloadAction<UserModelType>): void => {
    state.user = action.payload;
    Cookies.set('user', {...action.payload}, {
      expires: 3
    });
  },
  [userAction.logout.type]: (state: UserType): void => {
    state.user = false;
    Cookies.remove('user');
  },
  [userAction.autoLogin.type]: (state: UserType, action: PayloadAction<UserModelType>): void => {
    state.user = action.payload;
  }
});