import {
    LOAD_ALL_CATEGORIES_SUCCESS,
    LOAD_ALL_CATEGORIES_FAIL
}from './types'
import Axios from 'axios';
import {setAlert} from '../actions/alert'
import setAuthToken from '../utils/setAuthToken';

export const loadAllCategories = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await Axios.get('/card')
        dispatch({
            type: LOAD_ALL_CATEGORIES_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
          type: LOAD_ALL_CATEGORIES_FAIL,
        });
    }
}