import {
  STANDBY, //啟動ws之前
  CONNECTING, //已開通通路，未接收到訊息
  CONNECTED, //已接收到訊息
  DISCONNECTED, //斷線
  DISCONNECTING,
  RECONNECT, //斷線重新連線
  ERROR, //
} from './configs/status';

let _path = null;
let _wsInstance = null;

let currentStatus = null;

let onStatusChange = null;
let onReceiveMessage = null;

let _trackStatusEvents = {
  [STANDBY]: null,
  [CONNECTING]: null,
  [CONNECTED]: null,
  [RECONNECT]: null,
  [DISCONNECTING]: null,
  [DISCONNECTED]: null,
  [ERROR]: null,
};

const subscribeChannels = new Map();

const connectingInfo = {
  queue: [],
  count: 0,
  intervalTime: 10 * 60 * 1000,
};

function settingStatusChange(status, payload = null) {
  if (onStatusChange && currentStatus !== status)
    onStatusChange(currentStatus, status);

  currentStatus = status;

  const statusEvent = _trackStatusEvents[status];

  if (statusEvent) statusEvent(payload);
}

function setConnectCheck() {
  const { queue, intervalTime } = connectingInfo;

  if (_wsInstance && _wsInstance.readyState < 2) {
    const id = window.setTimeout(() => {
      connectingInfo.count++;
      setConnectCheck();

      settingStatusChange(CONNECTING, connectingInfo.count);
    }, intervalTime);

    queue.push(id);
  }
}

const clearConnectingInfo = () => {
  const { queue } = connectingInfo;

  queue.forEach((id) => {
    window.clearTimeout(id);
  });

  queue.splice(0, queue.length);

  connectingInfo.count = 0;
};

//取消舊的檢查，設定新的檢查
function checkConnect() {
  if (currentStatus !== CONNECTED) settingStatusChange(CONNECTED);

  clearConnectingInfo();
  setConnectCheck();
}

//event
function onOpen() {
  checkConnect();
}

function onMessage(e) {
  checkConnect();

  try {
    const msg = JSON.parse(e.data);
    const channel = msg.e;

    if (!Boolean(channel) || !subscribeChannels.has(channel)) return;
    console.log(
      '🚀 ~ file: control.js ~ line 96 ~ onMessage ~ subscribeChannels',
      subscribeChannels
    );

    const event = new CustomEvent(channel, { detail: msg });
    _wsInstance.dispatchEvent(event);
  } catch (e) {
    settingStatusChange(ERROR, e);
  }
}

function onClose(e) {
  if (currentStatus === DISCONNECTING) {
    settingStatusChange(DISCONNECTED);
  }
}

function onError(e) {
  settingStatusChange(ERROR, e);
}

function subscribeEvents() {
  _wsInstance.addEventListener('open', onOpen);

  _wsInstance.addEventListener('message', onMessage);

  _wsInstance.addEventListener('error', onError);

  _wsInstance.addEventListener('close', onClose);
}

function start() {
  if (_wsInstance || !_path) return;

  try {
    _wsInstance = new WebSocket(_path);

    subscribeEvents();
    settingStatusChange(STANDBY);
  } catch (e) {
    settingStatusChange(ERROR, e);
  }
}

function reconnect() {
  try {
    if (_wsInstance) {
      _wsInstance.close();
      _wsInstance = null;
      clearConnectingInfo();
    }

    _wsInstance = new WebSocket(_path);

    subscribeEvents();
    settingStatusChange(RECONNECT);
  } catch (e) {
    settingStatusChange(ERROR, e);
  }
}

function close() {
  if (currentStatus === DISCONNECTED || currentStatus === DISCONNECTING) return;

  try {
    _wsInstance.close();
    _wsInstance = null;

    clearConnectingInfo();
    settingStatusChange(DISCONNECTING);
  } catch (e) {
    settingStatusChange(ERROR, e);
  }
}

export function sendMsg(payload) {
  const json = JSON.stringify(payload);

  try {
    _wsInstance.send(json);
  } catch (e) {
    settingStatusChange(ERROR, e);
  }
}

export function setOnStatusChange(event) {
  onStatusChange = event;
}

export function getWSInstance() {
  return _wsInstance;
}

export function subscribeChannelMessage(channel, handler) {
  if (!Boolean(channel) || typeof handler !== 'function') return;

  if (!subscribeChannels.has(channel)) {
    subscribeChannels.set(channel, 0);
  }

  const subscribeEventCount = subscribeChannels.get(channel);
  subscribeChannels.set(channel, subscribeEventCount + 1);

  _wsInstance.addEventListener(channel, handler);
}

export function unsubscribeChannelMessage(channel, handler) {
  if (
    !Boolean(channel) ||
    typeof handler !== 'function' ||
    !subscribeChannels.has(channel)
  )
    return;

  _wsInstance.removeEventListener(channel, handler);

  const subscribeEventCount = subscribeChannels.get(channel);

  if (subscribeEventCount === 1) {
    subscribeChannels.delete(channel);
  } else {
    subscribeChannels.set(channel, subscribeEventCount - 1);
  }
}

export default function createWebsocketControl(
  path,
  trackStatusEvents,
  connectingIntervalTime
) {
  _path = path;

  if (typeof trackStatusEvents === 'object') {
    _trackStatusEvents = {
      ..._trackStatusEvents,
      ...trackStatusEvents,
    };
  }

  if (!isNaN(connectingIntervalTime)) {
    connectingInfo.intervalTime = connectingIntervalTime;
  }

  return {
    start,
    close,
    reconnect,
    sendMsg,
    subscribeChannelMessage,
    unsubscribeChannelMessage,
  };
}
