import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

const fetcher = (url : string) => axiosInstance.get(url).then(res => res.data);
export default fetcher;