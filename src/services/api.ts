import axios from "axios";
// @ts-ignore
import {HUGGY_API_V3_ACCESS_TOKEN, HUGGY_API_V3_BASE_URL} from '@env';
import {User} from "../helper/User";

export const api = axios.create({
  baseURL: HUGGY_API_V3_BASE_URL,
  headers: {
    "Authorization": `Bearer ${HUGGY_API_V3_ACCESS_TOKEN}`
  }
});

export async function authenticate() {
  let user = await api.get("agents/profile");
  user.data.accessToken = HUGGY_API_V3_ACCESS_TOKEN;
  return user;
}

export async function getContactsByPage(page: number) {
  let contacts;
  let response = await api.get(`contacts/?page=${page}`)
    .then(response => {
      contacts = response.data
    })
    .catch(error => {
      return error;
    });
  return contacts;
}
