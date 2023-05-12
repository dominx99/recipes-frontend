import { Route, Routes } from "react-router-dom";
import RequireAuthentication from "../security/app/middleware/RequireAuthentication";
import AuthenticationRouteList from "../security/app/routes/AuthenticationRouteList";
import PublishRecipesRequestPage from "./publish-requests/recipes/pages/PublishRecipesRequestPage";
import BackofficeRouteList from "./router/BackofficeRouteList";

function BackofficeApplication() {
  return (
    <Routes>
      <Route path={BackofficeRouteList.PUBLISH_RECIPES_REQUESTS} element={
        <RequireAuthentication redirectTo={AuthenticationRouteList.AUTHENTICATE}>
          <PublishRecipesRequestPage />
        </RequireAuthentication>
      } />
    </Routes>
  )
}

export default BackofficeApplication;
