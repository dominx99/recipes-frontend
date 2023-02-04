import axios from "../../app/axios";
import { CreateUserForm } from "./AccountForms";

interface ResponseType {
  status: string
}

export function addUser(form: CreateUserForm) {
  return new Promise<{data: ResponseType}>(async (resolve, reject) => {
    try {
      const res = await axios().post('api/v1/register', form);

      resolve(res);
    } catch (e: any) {
      reject(JSON.stringify(e.response.data));
    }
  })
}
