import { gql } from "@apollo/client";
import { IAddressData } from "../../@types/interfaces";
import appoloClient from "../appolo";

export const GET_ADDRESSES = gql`
  query getAddresses {
    getAddresses {
      id
      name
      phone
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation addAddress($input: AddressInput!) {
    addAddress(input: $input) {
      id
      name
      phone
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation updateAddressData($input: UpdateAddressInputs) {
    updateAddress(input: $input) {
      status
    }
  }
`;

export const GET_ADDRESS = gql`
  mutation getAddress($input: GetAddressIput) {
    getAddress(input: $input) {
      id
      name
      phone
      created_at
      updated_at
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation deleteAddress($input: DeleteAddressInput) {
    deleteAddress(input: $input) {
      status
    }
  }
`;

export interface IGetAddressResponse {
  getAddress: IAddressData;
}

export const getAddress = async ({
  addressId,
}: {
  addressId: string;
}): Promise<IGetAddressResponse> => {
  const response = await appoloClient.mutate({
    mutation: GET_ADDRESS,
    variables: {
      input: {
        id: addressId,
      },
    },
  });

  return response.data;
};
