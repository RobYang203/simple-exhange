import { combineReducers } from 'redux';
import setting from './settingReducer';
import market from './marketReducer';

const appReducer = combineReducers({
  market,
  setting,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
