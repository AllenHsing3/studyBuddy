import {
  LOAD_STUDY_CARDS_SUCCESS,
  LOAD_STUDY_CARDS_FAIL,
  FLAG_SUCCESS,
  FLAG_FAIL,
} from '../actions/types';

const initialState = {
  cards: [],
  cardDisplayed: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_STUDY_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: payload,
      };

    case LOAD_STUDY_CARDS_FAIL:
    case FLAG_SUCCESS:
    case FLAG_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
