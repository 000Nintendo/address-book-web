import { configureStore } from '@reduxjs/toolkit'
import { RootReducerType } from './features/rootReducer'
import { persistedReducer } from './persistedRootReducer'

export const store = configureStore({
    reducer: persistedReducer as RootReducerType
})

export type StoreStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


