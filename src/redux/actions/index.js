export const LOGIN = 'LOGIN';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const CLICK = 'CLICK';
export const NEW_THUNK = 'NEW_THUNK';
export const DELETE = 'DELETE';
export const EDITOR = 'EDITOR';
export const EDIT_ID = 'EDIT_ID';

export const userAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const actionSuccess = (payload) => ({
  type: REQUEST_SUCCESS,
  payload,
});

export const fetchWithThunk = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(endpoint);
  const response = await request.json();
  delete (response.USDT);
  dispatch(actionSuccess(response));
};

export const actionClick = (payload) => ({
  type: CLICK,
  payload,
});

export const newThunk = (payload) => ({
  type: NEW_THUNK,
  payload,
});

export const actionThunk = (state) => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(endpoint);
  const response = await request.json();
  delete (response.USDT);
  const newResponse = { ...state, exchangeRates: response };
  dispatch(newThunk(newResponse));
};

export const actionDelete = (payload) => ({
  type: DELETE,
  payload,
});

export const actionEditor = (payload) => ({
  type: EDITOR,
  payload,
});

export const actionIdEdit = (payload) => ({
  type: EDIT_ID,
  payload,
});
