import { Box, Button } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import LayoutContainer from "../../components/layout/LayoutContainer";
import { addressActions } from "../../redux/features/addresse";
import AddressList from "./AddressList";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addAddressContainer: {},
  })
);

const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const openAddUpdateAddressModal = () => {
    dispatch(
      addressActions.setAddUpdateAddressModal({
        isOpen: true,
      })
    );
  };

  return (
    <Box>
      <LayoutContainer>
        <Box className={classes.addAddressContainer} mt={3}>
          <Box sx={{ padding: "0px 20px" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={openAddUpdateAddressModal}
            >
              {t("Add new address")}
            </Button>
          </Box>

          <AddressList />
        </Box>
      </LayoutContainer>
    </Box>
  );
};

export default Home;
