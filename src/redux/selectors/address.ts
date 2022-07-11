import { StoreStateType } from "../store";

export const addUpdateAddressModalSelector = (state: StoreStateType) =>
  state.addresses.addEditAddressModal;
