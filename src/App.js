import React from "react";
import { Route, Routes, useLocation} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Payment from "./Components/Payment/Payment";
import Navbar from "./Components/Navbar/Navbar";
import SecondNav from "./Components/SecondNav/SecondNav";
import Manage from "./Components/Manage/Manage";
import Product from "./Components/Products/Product";
import Customer from "./Components/Customer/Customer";
import Profile from "./Components/Profile/Profile";

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
          <Route path="/product" element={<Product />} />
          <Route path="/customer" >
            <Route index element={<Customer />} />
            <Route path=":id" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
