import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IShop, defaultValue } from 'app/shared/model/shop.model';

export const ACTION_TYPES = {
  SEARCH_SHOPS: 'shop/SEARCH_SHOPS',
  FETCH_SHOP_LIST: 'shop/FETCH_SHOP_LIST',
  FETCH_SHOP: 'shop/FETCH_SHOP',
  CREATE_SHOP: 'shop/CREATE_SHOP',
  UPDATE_SHOP: 'shop/UPDATE_SHOP',
  DELETE_SHOP: 'shop/DELETE_SHOP',
  RESET: 'shop/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IShop>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ShopState = Readonly<typeof initialState>;

// Reducer

export default (state: ShopState = initialState, action): ShopState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SHOPS):
    case REQUEST(ACTION_TYPES.FETCH_SHOP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SHOP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SHOP):
    case REQUEST(ACTION_TYPES.UPDATE_SHOP):
    case REQUEST(ACTION_TYPES.DELETE_SHOP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SHOPS):
    case FAILURE(ACTION_TYPES.FETCH_SHOP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SHOP):
    case FAILURE(ACTION_TYPES.CREATE_SHOP):
    case FAILURE(ACTION_TYPES.UPDATE_SHOP):
    case FAILURE(ACTION_TYPES.DELETE_SHOP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SHOPS):
    case SUCCESS(ACTION_TYPES.FETCH_SHOP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHOP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SHOP):
    case SUCCESS(ACTION_TYPES.UPDATE_SHOP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SHOP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/shops';
const apiSearchUrl = 'api/_search/shops';

// Actions

export const getSearchEntities: ICrudSearchAction<IShop> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_SHOPS,
  payload: axios.get<IShop>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IShop> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SHOP_LIST,
  payload: axios.get<IShop>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IShop> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SHOP,
    payload: axios.get<IShop>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IShop> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SHOP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IShop> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SHOP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IShop> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SHOP,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
