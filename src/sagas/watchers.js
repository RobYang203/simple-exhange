import types from 'constants/actionTypes';
import { takeLatest } from 'redux-saga/effects';
import { getExchangeInfoSaga } from './marketSaga';

export function* watchGetExchangeInfo() {
  yield takeLatest(types.GET_EXCHANGE_INFO, getExchangeInfoSaga);
}
