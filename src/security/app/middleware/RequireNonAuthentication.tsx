import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import BackofficeRouteList from "../../../backoffice/router/BackofficeRouteList";
import CookeryRouteList from "../../../cookery/app/router/CookeryRouteList";
import { useAppSelector } from "../../../shared/app/hooks";
import { AuthenticationDetails, authenticationDetails } from "../../authentication/api/AuthenticationSlice";

interface Props {
  children: ReactElement<any, any>,
}

const RequireNonAuthentication = (props: Props) => {
  const details = useAppSelector(authenticationDetails);

  let isAuthenticated: boolean = details !== null;

  if (!isAuthenticated || !details) {
    return props.children;
  }

  const redirectTo = authenticatedRedirectPath(details);

  return <Navigate to={redirectTo} />;
}

const authenticatedRedirectPath = (details: AuthenticationDetails) => {
  if (details.roles.includes('ROLE_BACKOFFICE')) {
    return BackofficeRouteList.DASHBOARD;
  }

  return CookeryRouteList.HOME;
}

export default RequireNonAuthentication;
