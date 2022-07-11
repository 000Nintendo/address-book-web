import { StoreStateType } from "../store";

export const languageSelector = (state: StoreStateType) =>
  state.translation.lang;
