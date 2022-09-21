import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main, TeacherInfo, Teacher, Survey, Login, Signup, SurveyList } from "./allFiles";
import { useState, useEffect, createContext } from 'react'; 
import { instance } from "./instance";
import { AxiosError } from "axios";

interface userInfo{
  id: number;
  email: string;
  name: string;
  nickName: string;
  grade: number;
  classRoom: number;
  isLogin: boolean;
}

const userSet = {
  id: 0,
  email: "",
  name: "",
  nickName: "",
  grade: 0,
  classRoom: 0,
  isLogin: false,
};

export const UserContext = createContext(userSet);

function App() {

  const [user, setUser] = useState<userInfo>(userSet);

  useEffect(()=>{
    (async()=>{
      try{
        setUser({
          ...(await getUser()).data,
          isLogin: true,
        });
      }catch(error){
        if(error instanceof AxiosError && error.response?.status===401){
          setUser((prev) => ({ ...prev, isLogin: false }));
        }
      }
    })();
  }, []);

  const getUser = () => {
    return instance.get('/user', { headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access-token")}`
    }})
  }

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher/:id" element={<TeacherInfo />} />
        <Route path="/survey" element={<SurveyList />} />
        <Route path="/survey/:id" element={<Survey />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
