import React from "react";
import { Route, Routes, useLocation} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Payment from "./Components/Payment/Payment";
import Navbar from "./Components/Navbar/Navbar";
import SecondNav from "./Components/SecondNav/SecondNav";

import Manage from "./Components/Manage/Manage";

function App() {

  const location = useLocation();

  return (
    <>
      <Navbar pathName={location.pathname} />
      <SecondNav pathName={location.pathname} />
      <main>
        <Routes>
          <Route path="/" element={<Manage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
