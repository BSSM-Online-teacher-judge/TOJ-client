import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Main, TeacherInfo } from "./allFiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/teacherinfo" element={<TeacherInfo />} />
    </Routes>
  );
}

export default App;
