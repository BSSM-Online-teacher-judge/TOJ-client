import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Main,
  TeacherInfo,
  Teacher,
  Survey,
  Login,
  Signup,
  MonthlyTeacher,
  SurveyList,
  Ranking,
} from "./allFiles";
import { instance } from "./instance";
import { useDispatch } from "react-redux";
import { setUser, UserInfo } from "./modules/user";

function App() {
  React.useLayoutEffect(() => {
    if (localStorage.getItem("access-token")) {
      (async () => {
        try {
          const userInfo = (await instance.get("/user")).data;
          const user = {
            ...userInfo,
            isLogin: true,
          };
          onInsert(user);
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
      <Route path="/ranking" element={<Ranking />} />
    </Routes>
  );
}

export default App;
