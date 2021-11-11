import {
  startFetchingMiddleware,
  stopFetchingMiddleware,
} from "middlewares/fetchingMiddleware";
import { compose, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "reducers";
import rootSaga from "sagas";

function configureStore() {
  const sagaMiddleware = createSagaMiddleware({});

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewareList = [
    startFetchingMiddleware,
    sagaMiddleware,
    stopFetchingMiddleware,
  ];

  const preventStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewareList))
  );

  if (module.hot) {
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      preventStore.replaceReducer(nextRootReducer);
    });
  }

  return {
    store: {
      ...preventStore,
      runSaga: sagaMiddleware.run(rootSaga),
    },
  };
}
const { store } = configureStore();

export default store;
