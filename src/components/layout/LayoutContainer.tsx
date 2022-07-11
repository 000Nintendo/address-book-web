import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import Header from "../header/Header";

interface ILayoutContainer {
  children: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      maxWidth: 1240,
      margin: "auto",
      paddding: '0px 100px'
    },
  })
);

const LayoutContainer = ({ children }: ILayoutContainer) => {
  const classes = useStyles();

  return (
    <Box>
      <Header />
      <Box className={classes.contentContainer}>{children}</Box>
    </Box>
  );
};

export default LayoutContainer;
