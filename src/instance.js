import axios from "axios";
import {ValidateTimeAccessToken, ValidateTimeRefreshToken} from "./jwt/validateTimeToken";

export const noTokenInstance = axios.create({
  baseURL: "http://15.164.246.49:8080",
});

export const instance = axios.create({
  baseURL: "http://15.164.246.49:8080",
})

instance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("access-token")}`
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (config)=>{
      return config
    },
    async (error)=>{
      if(error.response.data.status === 401){
          try{
              const originalRequest = error.config;
              if(ValidateTimeRefreshToken() && !ValidateTimeAccessToken()){
                  const res = await noTokenInstance.put('/auth', {},{
                      headers:{
                          "Refresh-Token": localStorage.getItem("refresh-token"),

                      }
                  });
                  console.log(res);
                  if(res.status === 200){
                      localStorage.setItem("access-token", res.data.accessToken)
                      return instance(originalRequest);
                  }
              }
              else if(!ValidateTimeRefreshToken()){
                  localStorage.clear();
                  alert("다시 로그인해주세요.");
                  window.location.href="http://localhost:3000/login";
              }
          }catch(error){
              console.log(error)
          }
      }
      return Promise.reject(error);
    }
)