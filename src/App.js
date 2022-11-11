import React, {useState, useEffect} from "react";
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import "./App.css";
import VerifyAdmin from "./Components/VerifyAdmin";
import Login from "./Components/Login/Login";
import Payment from "./Components/Payment/Payment";
import Navbar from "./Components/Navbar/Navbar";
import SecondNav from "./Components/SecondNav/SecondNav";
import Manage from "./Components/Manage/Manage";
import Product from "./Components/Products/Product";
import Customer from "./Components/Customer/Customer";
import Profile from "./Components/Profile/Profile";
import Context from './Components/Context';
import Billing from "./Components/Billing/Billing";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState('');
  const { ProfileNameContext} = Context;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    VerifyAdmin().then((isValid) => {
      if (!isValid || isValid instanceof Error) {
        navigate("/login");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar pathName={location.pathname} />
      <ProfileNameContext.Provider value={{pageTitle}}>
        <SecondNav pathName={location.pathname} />
      </ProfileNameContext.Provider>
      <main>
        <Routes>
          <Route path="/" element={<Manage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product" element={<Product />} />
          <Route path="/customer" >
            <Route index element={<Customer />} />
            <Route path=":id" element={<Profile setPageTitle={setPageTitle}/>} />
          </Route>
          <Route path="/billing" element={<Billing />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
