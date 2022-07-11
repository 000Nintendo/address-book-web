import { combineReducers } from "@reduxjs/toolkit";
import { addressReducer } from "./addresse";
import { translationReducer } from "./translation";

export const rootReducer = combineReducers({
  addresses: addressReducer,
  translation: translationReducer,
});

export type RootReducerType = typeof rootReducer;
