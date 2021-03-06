import createWebsocketControl, { sendMsg } from './control';

let _wsc = null;

const standby = (wsc) => {
  console.log('🚀 ~ file: index.js ~ line 25 ~ standBy ~ wsc', wsc);
};

const connecting = (count) => {
  console.log('🚀 ~ file: index.js ~ line 21 ~ connecting ~', count);
  // if (count === 2) _wsc.reconnect();
};

const connected = (wsc) => {
  console.log('🚀 ~ file: index.js ~ line 33 ~ connected ~ wsc', wsc);
  _wsc.sendMsg({
    method: 'SUBSCRIBE',
    params: ['btcusdt@aggTrade', 'btcusdt@depth20'],
    id: 1,
  });
};

const disconnecting = (wsc) => {
  console.log('🚀 ~ file: index.js ~ line 38 ~ disconnecting ~ wsc', wsc);
};

const disconnected = (wsc) => {
  console.log('🚀 ~ file: index.js ~ line 43 ~ disconnected ~ wsc', wsc);
};

const reconnect = (wsc) => {
  console.log('🚀 ~ file: index.js ~ line 48 ~ reconnect ~ wsc', wsc);
};

const error = (wsc, e) => {
  console.log('🚀 ~ file: index.js ~ line 53 ~ error ~ wsc', wsc, e);
};

const onStatusChange = (msg) => {
  console.log(msg);
};

export default function createWS() {
  _wsc = createWebsocketControl('wss://stream.binance.com:9443/ws', {
    standby,
    connecting,
    connected,
    disconnecting,
    disconnected,
    reconnect,
    error,
  });

  _wsc.start();

  // _wsc.subscribeChannelMessage('depthUpdate', onStatusChange);
  // _wsc.subscribeChannelMessage('aggTrade', onStatusChange);
  // _wsc.unsubscribeChannelMessage('depthUpdate', onStatusChange);
}
