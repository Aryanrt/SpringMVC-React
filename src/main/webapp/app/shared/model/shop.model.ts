import { IUser } from 'app/shared/model/user.model';

export interface IShop {
  id?: number;
  shopName?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IShop> = {};
