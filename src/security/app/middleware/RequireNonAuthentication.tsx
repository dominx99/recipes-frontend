import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../shared/app/hooks";
import { authenticationDetails } from "../../authentication/api/AuthenticationSlice";

interface Props {
  children: ReactElement<any, any>,
  redirectTo: string,
}

const RequireNonAuthentication = (props: Props) => {
  const details = useAppSelector(authenticationDetails);

  let isAuthenticated: boolean = details !== null;

  return isAuthenticated ? <Navigate to={props.redirectTo} /> : props.children;
}

export default RequireNonAuthentication;
