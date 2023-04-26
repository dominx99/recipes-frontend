import { Route, Routes } from "react-router-dom";
import RequireAuthentication from "../security/app/middleware/RequireAuthentication";
import AuthenticationRouteList from "../security/app/routes/AuthenticationRouteList";
import DashboardPage from "./pages/DashboardPage";
import BackofficeRouteList from "./router/BackofficeRouteList";

function BackofficeApplication() {
  return (
    <Routes>
      <Route path={BackofficeRouteList.DASHBOARD} element={
        <RequireAuthentication redirectTo={AuthenticationRouteList.AUTHENTICATE}>
          <DashboardPage />
        </RequireAuthentication>
      } />
    </Routes>
  )
}

export default BackofficeApplication;
