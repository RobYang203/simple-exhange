import constants from 'flux-constants';

export const syncActionTypes = ['START_FETCHING', 'STOP_FETCHING'];

export const basicAsyncActionTypes = ['GET_EXCHANGE_INFO'];

export const websocketActionTypes = [
  'WS_STATUS_READY',
  'WS_STATUS_ERROR',
  'WS_STATUS_CLOSE',
  'WS_SYMBOL_CHANGE',
  'WS_INSERT_TRADE',
  'WS_DEPTH',
];

const asyncActionTypes = basicAsyncActionTypes.reduce((result, actionType) => {
  return [
    ...result,
    actionType,
    `${actionType}_SUCCESS`,
    `${actionType}_ERROR`,
  ];
}, []);

export default constants([
  ...syncActionTypes,
  ...asyncActionTypes,
  ...websocketActionTypes,
]);
