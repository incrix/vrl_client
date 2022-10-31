import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";

import Manage from "./Components/Manage/Manage";

function App() {
  return (
    <Routes>
          <Route path="/" element={<Manage />} />
          <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
