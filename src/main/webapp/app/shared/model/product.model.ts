export interface IProduct {
  id?: number;
  productName?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

export const defaultValue: Readonly<IProduct> = {};
