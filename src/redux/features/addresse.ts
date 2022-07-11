import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddUpdateAddressModalPayload } from "../../@types/store/address";

interface IAddressesState {
  addEditAddressModal: {
    isOpen: boolean;
    update: boolean;
    selectedAddressId: string | null;
  };
}

const initialModalState = {
    isOpen: false,
    update: false,
    selectedAddressId: null,
  }

const initialState: IAddressesState = {
  addEditAddressModal: initialModalState,
};

const modalSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddUpdateAddressModal(
      state,
      action: PayloadAction<IAddUpdateAddressModalPayload>
    ) {
        state.addEditAddressModal = { ...state.addEditAddressModal, ...action.payload}
    },

    closeAddUpdateAddressModal(state, _) {
        state.addEditAddressModal = initialModalState
    }
  },
});

export const addressReducer = modalSlice.reducer;
export const addressActions = modalSlice.actions;
