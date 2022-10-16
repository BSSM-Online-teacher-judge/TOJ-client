import axios from "axios";

export const instance = axios.create({
  baseURL: "http://15.164.246.49:8080",
});
