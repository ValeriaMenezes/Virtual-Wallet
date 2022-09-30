// Coloque aqui suas actions

export const LOGIN = 'LOGIN';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

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
