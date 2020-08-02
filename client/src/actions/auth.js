import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

import axios from 'axios';

export const register = ({ name, email, password }) => async (dispatch) => {
   const body = JSON.stringify({ name, email, password });
   const config = {
      headers: {
         'Content-Type': 'application/json'
      },
   };
   try {
      const res = await axios.post('/user/register', body, config);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      // Add in alerts later
      console.error(err.message);
      dispatch({
         type: REGISTER_FAIL,
      });
   }
};
