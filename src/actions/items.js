import * as api from "../api";

//  action creators
export const getItems = () => async (dispatch) => {
  try {
    const { data } = await api.getItems();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }

  const action = { type: "FETCH_ALL", payload: [] };

  dispatch(action);
};
