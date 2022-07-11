import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import clientRoutes from "./constants/routes";

import "react-toastify/dist/ReactToastify.css";
import { languageSelector } from "./redux/selectors/translation";

const Home = lazy(() => import("./pages/home/Home"));

function App() {
  const language = useSelector(languageSelector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div className="app-component">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={clientRoutes.home} element={<Home />} />
        </Routes>
      </Suspense>

      <ToastContainer />
    </div>
  );
}

export default App;
