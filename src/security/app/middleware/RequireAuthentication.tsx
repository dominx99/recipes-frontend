import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../shared/app/hooks";
import { authenticationDetails } from "../../authentication/api/AuthenticationSlice";

interface Props {
  children: ReactElement<any, any>,
  redirectTo: string,
}

const RequireAuthentication = (props: Props) => {
  const details = useAppSelector(authenticationDetails);

  let isAuthenticated: boolean = details !== null;

  return isAuthenticated ? props.children : <Navigate to={props.redirectTo} />;
}

export default RequireAuthentication;
