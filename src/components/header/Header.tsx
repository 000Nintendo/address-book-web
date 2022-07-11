import { Translate } from "@mui/icons-material";
import AdbIcon from "@mui/icons-material/Adb";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { translationActions } from "../../redux/features/translation";
import { languageSelector } from "../../redux/selectors/translation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    translateIcon: {
      color: theme.palette.background.default,
    },
  })
);

const langulages = [
  {
    label: "En",
    value: "en",
  },
  {
    label: "Hi",
    value: "hi",
  },
];

const Header = () => {
  const classes = useStyles();
  const language = useSelector(languageSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState({
    languageAnchor: null,
  });

  const openLanguageMenu = ({ event }: { event: any }) => {
    if (event) {
      setState({
        languageAnchor: event.currentTarget,
      });
      return;
    }

    setState({
      languageAnchor: null,
    });
  };

  const handleLanguageChange = (lang: string) => {
    dispatch(
      translationActions.changeLanguage({
        lang: lang,
      })
    );
    openLanguageMenu({ event: null });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid
            container
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                {t("Address Book")}
              </Typography>
            </Grid>

            <Grid item>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={t("Change language")}>
                  <Box
                    onClick={(event) => {
                      openLanguageMenu({ event });
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Box mr={1}>{language}</Box>
                    <IconButton sx={{ p: 0 }}>
                      <Translate className={classes.translateIcon} />
                    </IconButton>
                  </Box>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={state.languageAnchor}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(state.languageAnchor)}
                  onClose={() => openLanguageMenu({ event: null })}
                >
                  {langulages.map((lang) => (
                    <MenuItem
                      key={lang.value}
                      onClick={() => handleLanguageChange(lang.value)}
                    >
                      <Typography textAlign="center">{lang.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
