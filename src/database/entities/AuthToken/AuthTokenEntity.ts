import BaseEntity from "../BaseEntity";
import { v1 as uuid1 } from "uuid";

export interface ISchemeAuthToken {
  token: string;
  userId: string;
  expiredAt: number;
}

export default class AuthTokenEntity extends BaseEntity {
  protected collectionName: string = 'auth_tokens';

  getUserIdByToken(tokenName: string): Promise<string|null> {
    return new Promise(async resolve => {
      const ref = this.refId(tokenName);

      const model: ISchemeAuthToken|null = await ref.once('value').then(snapshot => {
        const token: ISchemeAuthToken|null = snapshot.val();
        return token;
      });

      if (model) {
        if (this.isExpiredAt(model.expiredAt)) {
          await ref.remove();
        } else {
          resolve(model.userId);
        }
      }

      resolve(null);
    });
  }

  isExpiredAt(expiredAt: number) {
    return expiredAt < (new Date()).getTime()
  }

  deleteAndCreateToken(userId: string): Promise<ISchemeAuthToken> {
    return new Promise<ISchemeAuthToken>(async resolve => {
      const keys: string[] = [];

      await this.ref().orderByChild('userId').equalTo(userId).once('value')
        .then(snapshot => {
          snapshot.forEach(action => {
            if (action.key) {
              keys.push(action.key);
            }
          })
        });

      const token = await this.create(userId);

      keys.map(key => this.refId(key).remove());

      resolve(token);
    });
  }

  create(userId: string): Promise<ISchemeAuthToken> {
    const data: ISchemeAuthToken = {
      userId,
      token: uuid1(),
      expiredAt: this.getThisExpiredAt()
    };

    return new Promise(async resolve => {
      await this.refId(data.token).set(data);
      resolve(data);
    });
  }

  getThisExpiredAt(): number {
    return (new Date()).getTime() + (7200 * 1000);
  }
}