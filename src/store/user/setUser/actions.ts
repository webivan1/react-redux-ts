import { createAction } from "@reduxjs/toolkit";
import { UserModelType } from "../types";
import { AppThunk } from "../../store";
import AuthTokenEntity from "../../../database/entities/AuthTokenEntity";
import UserEntity from "../../../database/entities/User/UserEntity";

export const signIn = createAction<UserModelType>('user/set');
export const logout = createAction('user/logout');
export const autoLogin = createAction<UserModelType>('user/auto-login');

export const signInAsync = (user: UserModelType): AppThunk => async dispatch => {
  const tokenModel = new AuthTokenEntity();
  const token = await tokenModel.deleteAndCreateToken(user.id);
  localStorage.setItem('authToken', token.token);
};

export const autoLoginAsync = (): AppThunk => async (dispatch, getState) => {
  const { user } = getState();

  if (!user.user) {
    const tokenModel = new AuthTokenEntity();
    const userModel = new UserEntity();

    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const userId = await tokenModel.getUserIdByToken(token);
        if (userId) {
          const user: UserModelType = await userModel.findById(userId);
          dispatch(autoLogin(user));
        }
      } catch (e) {
        localStorage.removeItem('authToken');
      }
    }
  }
};