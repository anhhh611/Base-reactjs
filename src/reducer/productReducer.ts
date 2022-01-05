import { TProduct } from './../type/types';
import axios from 'axios';
import { IndexedObject } from '../utils/type';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import { defaultValue } from '../models/product_model';
import { ICrudPutAction } from '../type/redux-action';

export const ACTION_TYPES = {
  CREATE_PRODUCT: 'fli_register/CREATE_PRODUCT',
  RESET: 'fli_register/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<TProduct>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  showModel: false,
};

export type ProductState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductState = initialState, action: IndexedObject): ProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CREATE_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };

    case FAILURE(ACTION_TYPES.CREATE_PRODUCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
        showModel: true,
      };

    case SUCCESS(ACTION_TYPES.CREATE_PRODUCT):
      console.log(' action.payload.data', action.payload.data);

      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
        showModel: true,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const apiUrl = 'https://test-heroku444.herokuapp.com/products2';

export const createEntity: ICrudPutAction<TProduct> = (entity) => async (dispatch) => {
  try {
    console.log('entity', entity);
    return await dispatch({
      type: ACTION_TYPES.CREATE_PRODUCT,
      payload: axios.post(apiUrl, JSON.stringify(entity)),
    });
  } catch (e) {
    console.log('eeeeeee', e);
    return null;
  }
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
