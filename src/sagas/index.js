import { fork, all } from "redux-saga/effects";
import * as Watchers from "./watchers";

export default function* sagaFormat() {
  const sagas = [];
  for (const key in Watchers) {
    sagas.push(fork(Watchers[key]));
  }

  yield all(sagas);
}
