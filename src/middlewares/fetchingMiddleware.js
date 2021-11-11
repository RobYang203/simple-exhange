import { startFetching } from 'actionCreators/globalActions';
import { basicAsyncActionTypes } from 'constants/actionTypes';

const responseRegExp = /_SUCCESS|_ERROR/;

export const startFetchingMiddleware = (store) => {
  console.log(
    '🚀 ~ file: fetchingMiddleware.js ~ line 7 ~ startFetchingMiddleware ~ store',
    store
  );
  return (next) => {
    console.log(
      '🚀 ~ file: fetchingMiddleware.js ~ line 9 ~ return ~ next',
      next
    );
    return (action) => {
      console.log(
        '🚀 ~ file: fetchingMiddleware.js ~ line 11 ~ return ~ action',
        action
      );
      const isBasicAsyncAction = basicAsyncActionTypes.includes(action.type);
      if (isBasicAsyncAction) {
        store.dispatch(startFetching(action.type));
      }
      return next(action);
    };
  };
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
