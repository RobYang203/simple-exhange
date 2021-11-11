import createWebsocketControl from 'ws/control';

const wsActionPrefix = /^WS_/;

const onConnected = (store) => () => {};

const handleReceivedMessage = (store) => {};

export const websocketMiddleware = (store) => {
  const wsc = createWebsocketControl(process.env.REACT_APP_WEBSOCKET_URL, {
    connected: onConnected(store),
  });

  wsc.start();

  wsc.setOnReceivedMessage(handleReceivedMessage(store));

  return (next) => (action) => {
    const { type } = action;
    const isWebsocketAction = wsActionPrefix.test(type);

    if (!isWebsocketAction) return next(action);
  };
};
