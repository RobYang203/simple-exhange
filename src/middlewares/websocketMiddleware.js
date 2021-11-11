import {
  refreshWsAggregateAction,
  refreshWsDepthAction,
  setWsStatusReadyAction,
} from 'actionCreators/websocketAction';
import createWebsocketControl, { sendWebsocketMessage } from 'ws/control';
import actionTypes from 'constants/actionTypes';

const wsActionPrefix = /^WS_/;

const messageId = 1;

const onConnected = (store) => () => {
  store.dispatch(setWsStatusReadyAction());
};

const handleReceivedMessage = (store) => (msg) => {
  if (msg.id) return;
  if (msg.e === 'aggTrade') {
    store.dispatch(refreshWsAggregateAction(msg));
  } else {
    store.dispatch(refreshWsDepthAction(msg));
  }
};

const createSubscribeSymbolMessage = (symbol) => {
  return {
    method: 'SUBSCRIBE',
    params: [`${symbol}@aggTrade`, `${symbol}@depth20`],
    id: messageId,
  };
};

const createUnsubscribeSymbolMessage = (symbol) => {
  return {
    method: 'UNSUBSCRIBE',
    params: [`${symbol}@aggTrade`, `${symbol}@depth20`],
    id: messageId,
  };
};

const changeSymbol = (originSymbol, nextSymbol) => {
  if (originSymbol)
    sendWebsocketMessage(createUnsubscribeSymbolMessage(originSymbol));

  sendWebsocketMessage(createSubscribeSymbolMessage(nextSymbol));
};

export default function websocketMiddleware(store) {
  const wsc = createWebsocketControl(process.env.REACT_APP_WEBSOCKET_URL, {
    connected: onConnected(store),
  });

  wsc.start();

  wsc.setOnReceivedMessage(handleReceivedMessage(store));

  return (next) => (action) => {
    const { type, payload } = action;
    const isWebsocketAction = wsActionPrefix.test(type);

    if (isWebsocketAction) {
      const { market } = store.getState();

      switch (type) {
        case actionTypes.WS_SYMBOL_CHANGE:
          const { currentSymbol } = market;
          changeSymbol(currentSymbol, payload.symbol);
          break;
        default:
          break;
      }
    }

    return next(action);
  };
}
