import axios from "axios";
// @ts-ignore
import { HUGGY_API_V3_ACCESS_TOKEN, HUGGY_API_V3_BASE_URL } from '@env';

const api = axios.create({
  baseURL: HUGGY_API_V3_BASE_URL,
  headers: {
    "Authorization": `Bearer ${HUGGY_API_V3_ACCESS_TOKEN}`
  }
});

export async function authenticate(){
  try {
    return api.get("agents/profile").then(response=>{
      console.log("Response: ", response.data)
    });
  } catch (exception){
    console.log("failed")
  }
}
