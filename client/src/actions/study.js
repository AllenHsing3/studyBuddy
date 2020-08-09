import { LOAD_STUDY_CARDS_SUCCESS, LOAD_STUDY_CARDS_FAIL, FLAG_FAIL, FLAG_SUCCESS } from './types';
import axios from 'axios';

export const loadStudy = (categoryId) => async (dispatch) => {
  try {
    const res = await axios.get(`/card/category/${categoryId}`);
    const { cards } = res.data;
    let shuffled = cards
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    dispatch({
      type: LOAD_STUDY_CARDS_SUCCESS,
      payload: shuffled,
    });
  } catch (err) {
    dispatch({
      type: LOAD_STUDY_CARDS_FAIL,
    });
  }
};

export const flagCard = (categoryId, _id) => async dispatch => {
  try {
    await axios.put(`/card/flag/${categoryId}/${_id}`)
    dispatch({
      type: FLAG_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: FLAG_FAIL
    })
  }
}

