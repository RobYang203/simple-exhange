import { marketState } from './initialState';
import types from 'constants/actionTypes';

export default function routeReducer(market = marketState, { type, payload }) {
  switch (type) {
    case types.GET_EXCHANGE_INFO_SUCCESS:
      return { ...market, symbols: [...payload] };
    case types.GET_EXCHANGE_INFO_ERROR:
    case types.GET_EXCHANGE_INFO:
    default:
      return market;
  }
}
