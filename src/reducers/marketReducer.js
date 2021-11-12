import { marketState } from './initialState';
import types from 'constants/actionTypes';

const insertTrade = (market, payload) => {
  const newTrades = [...market.trades];

  if (market.trades.length >= 50) {
    newTrades.pop();
  }

  newTrades.unshift(payload);

  return {
    ...market,
    trades: newTrades,
  };
};

export default function routeReducer(market = marketState, { type, payload }) {
  switch (type) {
    case types.GET_EXCHANGE_INFO_SUCCESS:
      return { ...market, symbols: [...payload] };
    case types.WS_SYMBOL_CHANGE:
      return {
        ...marketState,
        symbols: market.symbols,
        currentSymbol: { ...payload },
      };
    case types.WS_DEPTH:
      return { ...market, depths: { ...payload } };
    case types.WS_INSERT_TRADE:
      return insertTrade(market, payload);
    case types.GET_EXCHANGE_INFO_ERROR:
    case types.GET_EXCHANGE_INFO:
    default:
      return market;
  }
}
