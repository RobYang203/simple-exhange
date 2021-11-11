import { combineReducers } from "redux";
import setting from './settingReducer'

const appReducer = combineReducers({
    setting
});

const rootReducer = (state , action) => {
    return appReducer(state , action);
}

export default rootReducer;