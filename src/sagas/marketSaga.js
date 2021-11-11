import { getExchangeInfoResult } from 'apis/market';
import types from 'constants/actionTypes';
import { call, put } from 'redux-saga/effects';

const okExchangeInfo = (data) => {
  return {
    type: types.GET_EXCHANGE_INFO_SUCCESS,
    payload: data,
  };
};

const errExchangeInfo = () => {
  return {
    type: types.GET_EXCHANGE_INFO_ERROR,
  };
};

export function* getExchangeInfoSaga() {
  try {
    const { symbols } = yield call(getExchangeInfoResult);

    yield put(okExchangeInfo(symbols));
  } catch (error) {
    yield put(errExchangeInfo());
  }
}
