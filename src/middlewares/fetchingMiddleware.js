import { startFetching } from 'actionCreators/globalActions';
import { basicAsyncActionTypes } from 'constants/actionTypes';

const responseRegExp = /_SUCCESS|_ERROR/;

export const startFetchingMiddleware = (store) => (next) => (action) => {
  const isBasicAsyncAction = basicAsyncActionTypes.includes(action.type);
  if (isBasicAsyncAction) {
    store.dispatch(startFetching(action.type));
  }
  return next(action);
};

export const stopFetchingMiddleware = (store) => (next) => (action) => {
  const isBasicAsyncAction = basicAsyncActionTypes.includes(action.type);
  const isResponseAction = responseRegExp.test(action.type);
  const basicType = action.type.replace(responseRegExp, '');

  if (isBasicAsyncAction && isResponseAction) {
    store.dispatch(startFetching(basicType));
  }
  return next(action);
};
