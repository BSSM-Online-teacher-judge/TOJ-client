import axios from "axios";
import { ValidateTimeRefreshToken, ValidateTimeAccessToken } from "./jwt/validateTimeToken";

export const authInstance = axios.create({
  baseURL: "http://15.164.246.49:8080",
});

export const instance = axios.create({
  baseURL: "http://15.164.246.49:8080",
  headers: {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
  }
})

instance.interceptors.request.use(
    (config)=>{
      return config
    },
    async (error)=>{
      const originalRequest = error.config;
      if(ValidateTimeRefreshToken() && !ValidateTimeAccessToken()){
          const res = await authInstance.put('/auth', {
              headers:{
                  "Refresh-Token": `Bearer ${localStorage.getItem("refresh-token")}`
              }
          });
          if(res.status === 200){
              localStorage.setItem('access-token', res.data.accessToken)
              return instance(originalRequest);
          }
      }
      else if(!ValidateTimeRefreshToken()){
          localStorage.clear();
          alert("다시 로그인해주세요.");
          window.location.href="http://localhost:3000/login";
      }
      return Promise.reject(error);
    }
)