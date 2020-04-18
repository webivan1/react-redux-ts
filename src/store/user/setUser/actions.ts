import { createAction } from "@reduxjs/toolkit";
import { UserModelType } from "../types";

export const signIn = createAction<UserModelType>('user/set');
export const logout = createAction('user/logout');
export const autoLogin = createAction('user/auto-login');