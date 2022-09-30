// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCCESS } from '../actions';

const INICIAL_STATE = {
  currencies: [],
};

const wallet = (store = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...store,
      currencies: Object.keys(action.payload),
    };
  default:
    return store;
  }
};

export default wallet;
