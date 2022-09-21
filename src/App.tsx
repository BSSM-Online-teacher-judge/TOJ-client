import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main, TeacherInfo, Teacher, Survey, Login, Signup, SurveyList } from "./allFiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/teacher/:id" element={<TeacherInfo />} />
      <Route path="/survey" element={<SurveyList />} />
      <Route path="/survey/:id" element={<Survey />} />

    </Routes>
  );
}

export default App;
