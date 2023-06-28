import { legacy_createStore as createStore, Store } from 'redux';
import rootReducer, { RootState } from './reducers';
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<RootState> = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;