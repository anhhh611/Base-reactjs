import { TCategory, TProduct } from './../type/types';
import axios from 'axios';
import { IndexedObject } from '../utils/type';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import { defaultValue } from '../models/category_model';
import {
  ICrudDeleteAction,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
} from '../type/redux-action';

export const ACTION_TYPES = {
  CREATE_CATEGORY: 'fli_register/CREATE_CATEGORY',
  RESET: 'fli_register/RESET',
  DELETE_CATEGORY: 'category/DELETE_CATEGORY',
  UPDATE_CATEGORY: 'category/UPDATE_CATEGORY',
  FETCH_CATEGORY: 'category/FETCH_CATEGORY',
  GET_CATEGORY: 'category/GET_CATEGORY',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<TCategory>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  showModel: false,
};

export type CategoryState = Readonly<typeof initialState>;

// Reducer

export default (state: CategoryState = initialState, action: IndexedObject): CategoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CATEGORY):
    case REQUEST(ACTION_TYPES.CREATE_CATEGORY):
    case REQUEST(ACTION_TYPES.GET_CATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CATEGORY):
    case FAILURE(ACTION_TYPES.CREATE_CATEGORY):
    case FAILURE(ACTION_TYPES.GET_CATEGORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
        showModel: true,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORY):
      console.log(' action.payload.data', action.payload.data);

      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
        showModel: true,
      };
    case SUCCESS(ACTION_TYPES.GET_CATEGORY):
      console.log(' action.payload.data', action.payload.data);
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entities: action.payload.data,
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

const apiUrl = 'https://test-heroku444.herokuapp.com/categories2';

export const createEntity: ICrudPutAction<TCategory> = (entity) => async (dispatch) => {
  try {
    console.log('entity', entity);
    return await dispatch({
      type: ACTION_TYPES.CREATE_CATEGORY,
      payload: axios.post(apiUrl, JSON.stringify(entity)),
    });
  } catch (e) {
    console.log('eeeeeee', e);
    return null;
  }
};

export const updateEntity: ICrudPutAction<TCategory> = (entity) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CATEGORY,
    payload: axios.put(apiUrl, JSON.stringify(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<TCategory> = (id) => async (dispatch) => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CATEGORY,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const getEntity: ICrudGetAction<TCategory> = (id) => {
  console.log('id', id);
  const requestUrl = `https://test-heroku444.herokuapp.com/categories2/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORY,
    payload: axios.get<TCategory>(requestUrl),
  };
};

export const getAllCategories: ICrudGetAllAction<TCategory> = () => {
  return {
    type: ACTION_TYPES.GET_CATEGORY,
    payload: axios.get<TCategory>(apiUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
