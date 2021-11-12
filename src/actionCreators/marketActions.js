import types from 'constants/actionTypes';

export const getExchangeInfoAction = () => ({
  type: types.GET_EXCHANGE_INFO,
});

export const getExchangeInfoSuccessAction = (payload) => ({
  type: types.GET_EXCHANGE_INFO_SUCCESS,
  payload,
});

export const getExchangeInfoErrorAction = (payload) => ({
  type: types.GET_EXCHANGE_INFO_ERROR,
  payload,
});

export const initialMarketAction = () => ({
  type: types.INITIAL_MARKET,
});
