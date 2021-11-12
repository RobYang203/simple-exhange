import {
  insertWsTradeAction,
  refreshWsDepthAction,
  setWsStatusReadyAction,
} from 'actionCreators/websocketAction';
import createWebsocketControl, { sendWebsocketMessage } from 'ws/control';
import actionTypes from 'constants/actionTypes';

let _delayMS = 300;

let lastMS = 0;

const dataBuffer = {};

const wsActionPrefix = /^WS_/;

const messageId = 1;

const onConnected = (store) => () => {
  store.dispatch(setWsStatusReadyAction());
};

const handleReceivedMessage = (store) => (msg) => {
  if (msg.id) return;

  const receivedMS = new Date().getTime();

  const event = msg.e ?? 'depth';
  dataBuffer[event] = msg;

  if (receivedMS - lastMS < _delayMS) {
    return;
  }

  const { aggTrade, depth } = dataBuffer;

  if (aggTrade) {
    store.dispatch(insertWsTradeAction(dataBuffer.aggTrade));
    delete dataBuffer.aggTrade;
  }

  if (depth) {
    store.dispatch(refreshWsDepthAction(dataBuffer.depth));
    delete dataBuffer.depth;
  }

  lastMS = receivedMS;
};

const createSubscribeSymbolMessage = (symbol) => {
  return {
    method: 'SUBSCRIBE',
    params: [`${symbol}@aggTrade`, `${symbol}@depth10`],
    id: messageId,
  };
};

const createUnsubscribeSymbolMessage = (symbol) => {
  return {
    method: 'UNSUBSCRIBE',
    params: [`${symbol}@aggTrade`, `${symbol}@depth10`],
    id: messageId,
  };
};

const changeSymbol = (originSymbol, nextSymbol) => {
  if (originSymbol)
    sendWebsocketMessage(
      createUnsubscribeSymbolMessage(originSymbol.toLocaleLowerCase())
    );

  if (nextSymbol)
    sendWebsocketMessage(
      createSubscribeSymbolMessage(nextSymbol.toLocaleLowerCase())
    );
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
          changeSymbol(currentSymbol?.symbol, payload?.symbol);
          break;
        default:
          break;
      }
    }

    return next(action);
  };
}
