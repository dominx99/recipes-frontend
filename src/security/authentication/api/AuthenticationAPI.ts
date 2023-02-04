import axios from "./../../app/axios";
import { AuthenticationCredentials, AuthenticationDetails } from "./AuthenticationSlice";

export function authenticate(authenticationCredentials: AuthenticationCredentials) {
  return new Promise<{ data: AuthenticationDetails }>(async (resolve, reject) => {
    try {
      const res = await axios().post('api/v1/login', authenticationCredentials);

      resolve(res);
    } catch (e: any) {
      reject("Invalid credentials");
    }
  })
}

export function invalidateToken(authenticationDetails: AuthenticationDetails | null) {
  return new Promise<{}>(async (resolve, reject) => {
    try {
      await axios().post('api/v1/token/invalidate', {
        refresh_token: authenticationDetails?.refresh_token
      });

      localStorage.removeItem('AUTHENTICATION_DETAILS');

      resolve(true);
    } catch (e: any) {
      localStorage.removeItem('AUTHENTICATION_DETAILS');

      reject('Failed to invalidate token');
    }
  })
}
