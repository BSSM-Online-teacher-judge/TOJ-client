import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main, TeacherInfo, Teacher, Survey, Login, Signup } from "./allFiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/teacherinfo" element={<TeacherInfo />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
