import { Route, Routes } from "react-router-dom";
import CookeryRouteList from "../cookery/app/router/CookeryRouteList";
import RequireAuthentication from "../security/app/middleware/RequireAuthentication";
import AuthenticationRouteList from "../security/app/routes/AuthenticationRouteList";
import DashboardPage from "./pages/DashboardPage";

function BackofficeApplication() {
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
