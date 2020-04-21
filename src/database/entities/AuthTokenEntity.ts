import BaseEntity from "./BaseEntity";
import { v1 as uuid1, v4 as uuid4 } from "uuid";

export interface ISchemeAuthToken {
  id: string;
  token: string;
  userId: string;
  expiredAt: number;
}

export default class AuthTokenEntity extends BaseEntity {
  protected collectionName: string = 'auth_tokens';

  getUserIdByToken(tokenName: string): Promise<string|null> {
    const ref = this.ref().equalTo(tokenName, 'token');
    return ref.once('value').then(snapshot => {
      const data: ISchemeAuthToken = snapshot.val();

      if (this.isExpiredAt(data.expiredAt)) {
        snapshot.key && this.refId(snapshot.key).remove();
        return null;
      } else {
        return data.userId;
      }
    });
  }

  isExpiredAt(expiredAt: number) {
    return expiredAt < (new Date()).getTime()
  }

  deleteAndCreateToken(userId: string): Promise<ISchemeAuthToken> {
    const ref = this.ref().equalTo(userId, 'userId');
    return ref.once('value').then(snapshot => {
      const { id }: ISchemeAuthToken = snapshot.val();
      return this.refId(id).remove().then(() => this.create(userId));
    }).catch(() => this.create(userId));
  }

  create(userId: string): ISchemeAuthToken {
    const data: ISchemeAuthToken = {
      id: uuid4(),
      userId,
      token: uuid1(),
      expiredAt: (new Date()).getTime() + (7200 * 1000)
    };

    this.ref().push(data);

    return data;
  }
}