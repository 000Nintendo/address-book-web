import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChangeLanguagePayload } from "../../@types/store/translation";

const initialState = {
  lang: "en",
};

const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<IChangeLanguagePayload>) => {
      state.lang = action.payload.lang;
    },
  },
});


export const translationReducer = translationSlice.reducer;
export const translationActions = translationSlice.actions;
