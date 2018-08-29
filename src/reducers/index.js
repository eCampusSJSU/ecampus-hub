import {combineReducers} from 'redux';
import userReducer from './user';
import artemplateReducer from './artemplate';
import globalReducer from './global';
import {reducer as notificationsReducer} from 'react-notification-system-redux';

const rootReducer = combineReducers({globalReducer, notificationsReducer, userReducer, artemplateReducer});

export default rootReducer