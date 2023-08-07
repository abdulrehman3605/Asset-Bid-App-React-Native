import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/users';
import OrdersReducer from './reducers/orders';
import availableItemsReducer from './reducers/availableItems';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}


const rootReducer = combineReducers({
    userReducer,
    OrdersReducer,
    availableItemsReducer
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducers, applyMiddleware(thunk));
export const persistor = persistStore(store)