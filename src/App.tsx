import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main, TeacherInfo, Teacher, Survey, SurveyList } from "./allFiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/teacherinfo" element={<TeacherInfo />} />
      <Route path="/survey" element={<SurveyList />} />
      <Route path="/survey/:id" element={<Survey />} />
    </Routes>
  );
}

export default App;
