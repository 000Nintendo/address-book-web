import { useMutation } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { IAddressData } from "../../@types/interfaces";
import {
  ADD_ADDRESS,
  getAddress,
  UPDATE_ADDRESS,
} from "../../graphql/queries/address";
import { addressActions } from "../../redux/features/addresse";
import { addUpdateAddressModalSelector } from "../../redux/selectors/address";
import { Toast } from "../../utils/toast";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressBar: {
      "& svg": {
        color: theme.palette.background.default,
      },
    },
  })
);

interface IAddAddressModal {
  handleSuccess?: () => void;
}

const AddAddressModal = ({ handleSuccess }: IAddAddressModal) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const addAddressValidationSchema = yup.object({
    name: yup.string().required(t("Full name is required!")),
    phone: yup
      .string()
      .min(10, t("Mobile number must be 10 digits long!"))
      .required(t("Mobile number is required!")),
  });

  const modalState = useSelector(addUpdateAddressModalSelector);

  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    isModalOpen: false,
    fetchingAddressData: false,
  });

  const getAddressData = async () => {
    setState({
      ...state,
      fetchingAddressData: true,
    });
    const response = await getAddress({
      addressId: modalState.selectedAddressId as string,
    });

    if (response?.getAddress) {
      formik.setFieldValue("name", response?.getAddress.name);
      formik.setFieldValue("phone", response?.getAddress.phone);
      setState({
        ...state,
        fetchingAddressData: false,
      });
    }
  };

  useEffect(() => {
    if (modalState.update) getAddressData();
  }, [modalState]);

  const handleCloseModal = () => {
    formik.resetForm();
    dispatch(addressActions.closeAddUpdateAddressModal({}));
  };

  const [addAddress, { loading }] = useMutation<{
    addAddress: IAddressData;
  }>(ADD_ADDRESS, {
    onCompleted(data) {
      console.log(data);
      if (data.addAddress.id) {
        formik.resetForm();
        handleCloseModal();
        if (handleSuccess) handleSuccess();
        return;
      }
    },
    onError(error) {
      console.log(error.message);
      Toast.error(error.message);
    },
  });

  const [updateAddress, updateMutationMethods] = useMutation<{
    updateAddress: {
      status: boolean;
    };
  }>(UPDATE_ADDRESS, {
    onCompleted(data) {
      console.log(data);
      if (data?.updateAddress?.status) {
        formik.resetForm();
        handleCloseModal();
        if (handleSuccess) handleSuccess();
        return;
      }
    },
    onError(error) {
      console.log(error.message);
      Toast.error(error.message);
    },
  });

  const handleSubmit = (values: { name: string; phone: string }) => {
    if (modalState.update) {
      updateAddress({
        variables: {
          input: { ...values, id: modalState.selectedAddressId },
        },
      });
      return;
    }
    addAddress({
      variables: {
        input: values,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: addAddressValidationSchema,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog
      open={modalState.isOpen}
      maxWidth="md"
      fullWidth
      onClose={() => handleCloseModal()}
    >
      <DialogTitle>
        {modalState.update ? t("Update address") : t("Add address")}
      </DialogTitle>

      {state.fetchingAddressData ? (
        <Box
          sx={{
            width: "fit-content",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          <Box
            sx={{ position: "relative", marginRight: 2, textAlign: "center" }}
          >
            <CircularProgress size="30px" />
            <Typography mt={2} align="center">
              {t("Fetching address details please wait")}
            </Typography>
          </Box>
        </Box>
      ) : null}

      {!state.fetchingAddressData ? (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent sx={{}}>
            <Box>
              <TextField
                id="filled-multiline-static"
                name="name"
                label={t("Full name")}
                type="text"
                variant="filled"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.name}
                error={
                  Boolean(formik.touched.name) && Boolean(formik.errors.name)
                }
                helperText={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
              />
            </Box>
            <br />

            <Box>
              <TextField
                name="phone"
                id="filled-multiline-static"
                label={t("Mobile")}
                type="text"
                variant="filled"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={
                  Boolean(formik.touched.phone) && Boolean(formik.errors.phone)
                }
                helperText={
                  Boolean(formik.touched.phone) && formik.errors.phone
                }
                onBlur={formik.handleBlur}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "start", padding: "20px 24px" }}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
              }}
            >
              {loading ||
              state.fetchingAddressData ||
              updateMutationMethods.loading ? (
                <Box sx={{ position: "relative", marginRight: 2 }}>
                  <CircularProgress
                    size="20px"
                    className={classes.progressBar}
                  />
                </Box>
              ) : null}

              <Typography>
                {modalState.update ? t("Update address") : t("Add address")}
              </Typography>
            </Button>

            <Button variant="outlined" onClick={handleCloseModal}>
              {t("Cancel")}
            </Button>
          </DialogActions>
        </form>
      ) : null}
    </Dialog>
  );
};

export default AddAddressModal;
