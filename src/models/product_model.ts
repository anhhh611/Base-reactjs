export interface TProduct {
  id?: number;
  name?: string;
  category?: string;
  categoryId?: number;
  price?: number;
  des?: string;
  qty?: number;
  url1?: string;
  url2?: string;
}
export const defaultValue: Readonly<TProduct> = {};
