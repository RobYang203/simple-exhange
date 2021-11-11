import { settingState } from "./initialState";
import types from "constants/actionTypes";

const startFetching = (setting, payload) => ({
  ...setting,
  fetchingTypes: {
    ...setting.fetchingTypes,
    [payload]: "LOADING",
  },
});

const stopFetching = (setting, payload) => {
  const { fetchingTypes } = setting;
  delete fetchingTypes[payload];
  return { ...setting, fetchingTypes: { ...fetchingTypes } };
};

export default function routeReducer(
  setting = settingState,
  { type, payload }
) {
  switch (type) {
    case types.START_FETCHING:
      return startFetching(setting, payload);
    case types.STOP_FETCHING:
      return stopFetching(setting, payload);
    default:
      return setting;
  }
}
