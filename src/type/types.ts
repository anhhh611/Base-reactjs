import { IPayload } from './redux-action';
import { SET_LANGUAGE } from '../store/actionTypes';

export type Func = (...args: any) => void;
export const returnVoidDummyFn: (...args: any) => void = () => {
  // eslint-disable-next-line no-console
  console.log('this function is dummy.');
};
export type AppDispatch<T> = (dispatch: any) => IPayload<T>;

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  payload: string;
}

export type LangAction = SetLanguageAction;

export type TProduct = {
  id: number;
  name: string;
  category: string;
  categoryId: number;
  price: number;
  des: string;
  qty: number;
  url1: string;
  url2: string;
};
export type TCategory = {
  id: number;
  name: string;
};
