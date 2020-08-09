import {
  LOAD_ALL_CATEGORIES_SUCCESS,
  LOAD_ALL_CATEGORIES_FAIL,
  CREATE_CATAGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  ADD_CARD_FAIL,
  ADD_CARD_SUCCESS,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  DELETE_CARD_FAIL,
  DELETE_CARD_SUCESS,
  EDIT_FAIL,
  EDIT_SUCCESS,
} from './types';
import axios from 'axios';
import { setAlert } from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';

// LOAD ALL CATEGORIES
export const loadAllCategories = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/card');
    dispatch({
      type: LOAD_ALL_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOAD_ALL_CATEGORIES_FAIL,
    });
  }
};

// LOAD CATEGORY BY ID
export const loadCategory = (_id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.get(`/card/category/${_id}`);

    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_CATEGORY_FAIL,
    });
  }
};

// CREATE NEW CATEGORY
export const createCategory = (newCategory, userId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const body = JSON.stringify({ categoryName: newCategory });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/card/category', body, config);
    dispatch({
      type: CREATE_CATAGORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CREATE_CATEGORY_FAIL,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = (_id) => async (dispatch) => {
  try {
    await axios.delete(`/card/category/${_id}`);
    setAlert('Deck deleted', 'danger');
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: _id,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: DELETE_CATEGORY_FAIL,
    });
  }
};

// ADD NEW CARD
export const addCard = ({ front, back, categoryId }) => async (dispatch) => {
  try {
    const body = JSON.stringify({ front, back });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/card/category/${categoryId}`, body, config);
    dispatch({
      type: ADD_CARD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ADD_CARD_FAIL,
    });
  }
};

export const deleteCard = (categoryId, _id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.delete(`/card/category/${categoryId}/${_id}`);
    dispatch({
      type: DELETE_CARD_SUCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_CARD_FAIL,
    });
  }
};

export const editCard = ({ categoryId, _id, editFront, editBack }) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const body = JSON.stringify({ editFront, editBack });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `/card/category/${categoryId}/${_id}`,
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: EDIT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EDIT_FAIL,
    });
  }
};
