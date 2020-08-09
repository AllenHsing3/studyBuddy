import {
  LOAD_ALL_CATEGORIES_SUCCESS,
  LOAD_ALL_CATEGORIES_FAIL,
  CREATE_CATEGORY_FAIL,
  CREATE_CATAGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  ADD_CARD_FAIL,
  ADD_CARD_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_SUCCESS,
  DELETE_CARD_SUCESS,
  DELETE_CARD_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
} from '../actions/types';

const initialState = {
  loading: true,
  categories: [],
  editCategory: {},
  editLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        loading: false,
        editLoading: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        editCategory: payload,
        editLoading: false,
        loading: true,
      };
    case CREATE_CATAGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, payload],
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
      };
    case ADD_CARD_SUCCESS:
      return {
        ...state,
        editCategory: payload,
      };
    case DELETE_CARD_SUCESS:
    case EDIT_SUCCESS:
      return {
        ...state,
        editCategory: payload,
        editLoading: true,
      };
    case LOAD_ALL_CATEGORIES_FAIL:
    case CREATE_CATEGORY_FAIL:
    case DELETE_CATEGORY_FAIL:
    case ADD_CARD_FAIL:
    case GET_CATEGORY_FAIL:
    case DELETE_CARD_FAIL:
    case EDIT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
