import axios from "../../app/axios"

export default function fetchAllUnits() {
  return new Promise<{data: string[]}>((resolve, reject) => {
    try {
      const res = axios().get('/api/v1/units');

      resolve(res);
    } catch (error) {
      reject(error);
    }
  })
}
