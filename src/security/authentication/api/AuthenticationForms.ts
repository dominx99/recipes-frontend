import { CreateUserForm } from "../../account/api/AccountForms";
import { AuthenticationCredentials } from "./AuthenticationSlice";

export const createUserFormToAuthenticationCredentialsConverter = (form: CreateUserForm): AuthenticationCredentials => {
  return {
    username: form.email,
    password: form.plain_password,
  }
}
