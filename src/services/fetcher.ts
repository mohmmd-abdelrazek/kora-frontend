import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const fetcher = (url : string) => axiosInstance.get(url).then(res => res.data);
export default fetcher;