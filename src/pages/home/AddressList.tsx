import { useQuery } from "@apollo/client";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { IAddressData } from "../../@types/interfaces";
import AddAddressModal from "../../components/modals/AddAddressModal";
import { GET_ADDRESSES } from "../../graphql/queries/address";
import { Toast } from "../../utils/toast";
import AddressCard from "./AddressCard";

const AddressList = () => {
  const { t } = useTranslation();
  const { loading, data, refetch } = useQuery<{
    getAddresses: IAddressData[];
  }>(GET_ADDRESSES, {
    onError(error) {
      console.log(error.message);
      Toast.error(error.message);
    },
  });

  const handleRefetch = () => {
    refetch();
  };

  return (
    <Box mt={2}>
      <AddAddressModal handleSuccess={handleRefetch} />
      {loading ? (
        <Box
          sx={{
            width: "fit-content",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ position: "relative", marginRight: 2, textAlign: "center" }}
          >
            <CircularProgress size="30px" />
            <Typography mt={2} align="center">
              {t("Fetching data please wait")}
            </Typography>
          </Box>
        </Box>
      ) : null}

      {!loading ? (
        data?.getAddresses?.length === 0 || !data?.getAddresses?.length ? (
          <Box
            mt={8}
            sx={{ width: "100%", justifyContent: "center", display: "flex" }}
          >
            <Box
              sx={{
                width: "fit-content",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box mb={2} sx={{ display: "flex", justifyContent: "center" }}>
                <img src="/assets/icons/list-icon.png" alt="" />
              </Box>
              <Typography>{t("Your Address Book Is Empty!")}</Typography>
            </Box>
          </Box>
        ) : (
          <Grid container>
            {data?.getAddresses.map((address) => (
              <Grid
                item
                key={address.id}
                sm={3}
                sx={{
                  padding: 2,
                }}
              >
                <AddressCard
                  address={address}
                  handleDeleteSuccess={handleRefetch}
                />
              </Grid>
            ))}
          </Grid>
        )
      ) : null}
    </Box>
  );
};

export default AddressList;
