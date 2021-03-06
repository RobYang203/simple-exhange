import types from 'constants/actionTypes';

export const setWsStatusReadyAction = () => ({
  type: types.WS_STATUS_READY,
});

export const setWsStatusErrorAction = (payload) => ({
  type: types.WS_STATUS_ERROR,
  payload,
});

export const setWsStatusCloseAction = () => ({
  type: types.WS_STATUS_CLOSE,
});

export const setWsSymbolChangeAction = (payload) => ({
  type: types.WS_SYMBOL_CHANGE,
  payload,
});

export const insertWsTradeAction = (payload) => ({
  type: types.WS_INSERT_TRADE,
  payload,
});

export const refreshWsDepthAction = (payload) => ({
  type: types.WS_DEPTH,
  payload,
});
