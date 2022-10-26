import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Main,
  TeacherInfo,
  Teacher,
  Survey,
  Login,
  Signup,
  SurveyList,
  MonthlyTeacher,
} from "./allFiles";
import { instance } from "./instance";
import { useDispatch } from "react-redux";
import { setUser, UserInfo } from "./modules/user";

function App() {
  const nav = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("access-token")) {
      (async () => {
        try {
          const userInfo = (await getUser(localStorage.getItem("access-token")))
            .data;
          const user = {
            ...userInfo,
            isLogin: true,
          };
          onInsert(user);
          // nav('/');
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const dispatch = useDispatch();

  const onInsert = (userInfo: UserInfo) => {
    dispatch(setUser(userInfo));
  };

  const getUser = (accessToken: string | null) => {
    return instance.get("/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/teacher/:id" element={<TeacherInfo />} />
      <Route path="/survey" element={<SurveyList />} />
      <Route path="/survey/:id" element={<Survey />} />
      <Route path="/monthly" element={<MonthlyTeacher />} />
    </Routes>
  );
}

export default App;
