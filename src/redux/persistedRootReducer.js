import persistReducer from 'redux-persist/lib/persistReducer'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './features/rootReducer'

const persistConfig = {
    key: 'address-book-redux-root-state',
    storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
