import { useMutation } from "@apollo/client";
import { Call, Edit, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Theme,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IAddressData } from "../../@types/interfaces";
import { DELETE_ADDRESS } from "../../graphql/queries/address";
import { addressActions } from "../../redux/features/addresse";
import { Toast } from "../../utils/toast";

interface IAddressCard {
  address: IAddressData;
  handleDeleteSuccess: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressBar: {
      "& svg": {
        color: theme.palette.background.default,
      },
    },
  })
);

const AddressCard = ({ address, handleDeleteSuccess }: IAddressCard) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    conformationModalState: false,
  });

  const handleDeleteConformationModal = (isOpen: boolean) => {
    setState({
      ...state,
      conformationModalState: isOpen,
    });
  };

  const [deleteAddress, { loading }] = useMutation<{
    deleteAddress: {
      status: boolean;
    };
  }>(DELETE_ADDRESS, {
    onCompleted(data) {
      console.log(data);
      if (data?.deleteAddress?.status) {
        handleDeleteConformationModal(false);
        if (handleDeleteSuccess) handleDeleteSuccess();
        return;
      }
    },
    onError(error) {
      console.log(error?.message);
      Toast.error(error.message);
    },
  });

  const handleEdit = () => {
    dispatch(
      addressActions.setAddUpdateAddressModal({
        isOpen: true,
        update: true,
        selectedAddressId: address.id,
      })
    );
  };

  return (
    <>
      <Dialog
        open={state.conformationModalState}
        maxWidth="sm"
        fullWidth
        onClose={() => handleDeleteConformationModal(false)}
      >
        <DialogContent sx={{}}>
          <Typography align="center" variant="h5">
            {t("Are you sure to delete")}
          </Typography>
          <br />
          <br />
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                marginRight: 2,
              }}
              onClick={() =>
                deleteAddress({
                  variables: {
                    input: {
                      id: address.id,
                    },
                  },
                })
              }
            >
              {loading ? (
                <Box sx={{ position: "relative", marginRight: 2 }}>
                  <CircularProgress
                    size="20px"
                    className={classes.progressBar}
                  />
                </Box>
              ) : null}

              <Typography>{t("Delete")}</Typography>
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleDeleteConformationModal(false)}
            >
              {t("Cancel")}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Card sx={{ width: "100%", maxWidth: 345 }}>
        <CardContent sx={{ display: "flex" }}>
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {address.name}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box mr={1} sx={{ display: "flex", alignItems: "center" }}>
                <Call fontSize="small" />
              </Box>{" "}
              {address.phone}
            </Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="edit address" onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete address"
            onClick={() => handleDeleteConformationModal(true)}
          >
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default AddressCard;
