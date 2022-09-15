import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Teacher from "./components/Teacher";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/teacher" element={<Teacher />} />
    </Routes>
  );
}

export default App;
