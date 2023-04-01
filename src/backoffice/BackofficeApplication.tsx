import { ThemeProvider } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import CookeryRouteList from "../cookery/app/router/CookeryRouteList";
import RequireAuthentication from "../security/app/middleware/RequireAuthentication";
import AuthenticationRouteList from "../security/app/routes/AuthenticationRouteList";
import { setAuthenticationDetails } from "../security/authentication/api/AuthenticationSlice";
import { useAppDispatch } from "../shared/app/hooks";
import { ThemeWrapper } from "../shared/components/ThemeWrapper";
import { darkTheme } from "../shared/mui/themes";
import DashboardPage from "./pages/DashboardPage";

function BackofficeApplication() {
  let dispatch = useAppDispatch();
  let restoredDetails = localStorage.getItem('AUTHENTICATION_DETAILS');

  dispatch(setAuthenticationDetails(restoredDetails));

  return (
    <Routes>
      <Route path={CookeryRouteList.DASHBOARD} element={
        <RequireAuthentication redirectTo={AuthenticationRouteList.AUTHENTICATE}>
          <DashboardPage />
        </RequireAuthentication>
      } />
    </Routes>
  )
}

export default BackofficeApplication;
