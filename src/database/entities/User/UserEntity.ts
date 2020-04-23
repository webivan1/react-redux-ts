import BaseEntity from "../BaseEntity";
import { v4 as uuid4 } from "uuid";
import { UserModelType, UserStatuses, UserUpdateType } from "../../../store/user/types";
import {
  ISchemeUser,
  ResponseStatuses,
  UserResponseType
} from "./types";

import AuthTokenEntity from "../AuthToken/AuthTokenEntity";

export default class UserEntity extends BaseEntity {
  protected collectionName: string = 'users';

  create(username: string, email: string, password: string, status?: keyof typeof UserStatuses): Promise<UserResponseType> {
    return new Promise(async resolve => {
      const findUser = await this.ref().orderByChild('email').equalTo(email).once('value')
        .then(snapshot => snapshot.val());

      if (findUser) {
        resolve({ status: ResponseStatuses.error, message: 'User is already exists' });
      } else {
        const user: ISchemeUser = {
          id: uuid4(),
          username,
          email,
          password,
          status: status || UserStatuses.notVerified,
          createdAt: (new Date()).getTime(),
        };

        await this.refId(user.id).set({...user});
        delete user.password;

        const token = new AuthTokenEntity();
        const data = await token.create(user.id);

        resolve({ status: ResponseStatuses.success, user, token: data.token });
      }
    });
  }

  update(user: UserModelType, fields: UserUpdateType): Promise<UserResponseType> {
    return new Promise(async resolve => {
      try {
        await this.refId(user.id).update(fields);
        return resolve({ status: ResponseStatuses.success, user: {...user, ...fields} })
      } catch (e) {
        return resolve({ status: ResponseStatuses.error, message: 'Error updating user' })
      }
    });
  }

  verify(user: UserModelType, verifyCode: string): Promise<UserResponseType> {
    return new Promise(async resolve => {
      // @todo create email_verification { userId: KEY, verifyCode }
      if (verifyCode === '12345') {
        const response = await this.update(user, { status: UserStatuses.active });
        resolve(response);
      } else {
        resolve({ status: ResponseStatuses.error, message: 'No correct verify code' })
      }
    })
  }

  findById(id: string): Promise<UserModelType|null> {
    return new Promise<UserModelType | null>(async resolve => {
      try {
        const user: UserModelType = await this.refId(id).once('value')
          .then(snapshot => snapshot.val());

        resolve(user);
      } catch (e) {
        resolve(null);
      }
    });
  }

  /**
   * Method for auth
   */
  findByCredentials(email: string, password: string): Promise<UserResponseType> {
    return new Promise(async resolve => {
      const user: ISchemeUser|null = await this.ref().orderByChild('email').equalTo(email).once('value')
        .then(snapshot => {
          let findUser: ISchemeUser|null = null;
          snapshot.forEach(action => findUser = action.val());
          return findUser;
        });

      if (user) {
        if (user.password !== password) {
          resolve({ status: ResponseStatuses.error, message: 'This password is not valid' });
        } else {
          delete user.password;

          const token = new AuthTokenEntity();
          const data = await token.deleteAndCreateToken(user.id);

          resolve({ status: ResponseStatuses.success, user, token: data.token })
        }
      } else {
        resolve({ status: ResponseStatuses.error, message: 'User is not found' });
      }
    });
  }
}