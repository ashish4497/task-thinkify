import { combineReducers,legacy_createStore as createStore,applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

import rootReducer from "../store/reducer/rootReducer";

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;