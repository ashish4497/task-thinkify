/** @format */
import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST,SET_CONTENT} from './action.type';

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://random-flat-colors.vercel.app/api/random?count=5',
      );
      const data = await response.json();
      dispatch({
        type: FETCH_DATA_REQUEST,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};


export const setContentFunction = (payload) => {
  console.log(payload,"payload");
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_CONTENT,
        payload
      });
    } catch (error) {
      console.log(error);
    }
  };
}