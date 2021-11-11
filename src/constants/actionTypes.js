import constants from 'flux-constants';

export const syncActionTypes = ['START_FETCHING', 'STOP_FETCHING'];

export const basicAsyncActionTypes = [];

export const websocketActionTypes = [];

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
