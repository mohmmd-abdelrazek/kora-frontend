import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.SERVER_URL,
});

const fetcher = (url : string) => axiosInstance.get(url).then(res => res.data);
export default fetcher;