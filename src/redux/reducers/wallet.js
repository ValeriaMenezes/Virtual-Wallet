// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCCESS, CLICK, NEW_THUNK, DELETE, EDITOR, EDIT_ID } from '../actions';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case CLICK:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses,
        value: action.payload.value,
        description: action.payload.description,
        currency: action.payload.currency,
        method: action.payload.method,
        tag: action.payload.tag,
        exchangeRates: action.payload.exchangeRates,
      }],
    };
  case NEW_THUNK:
    return {
      ...state,
      expenses: [...state.expenses,
        action.payload,
      ],
    };
  case DELETE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  case EDITOR:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EDIT_ID:
    // console.log('funciona', action.payload);
    return { ...state, expenses: [...action.payload], editor: false };
  default:
    return state;
  }
};

export default wallet;
