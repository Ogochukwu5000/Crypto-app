import { legacy_createStore as createStore, Store } from 'redux';
import rootReducer, { RootState } from './reducers';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<RootState> = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;