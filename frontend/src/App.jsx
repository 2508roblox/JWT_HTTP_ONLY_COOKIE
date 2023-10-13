import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ShopScreen from "./pages/ShopScreen";
import BlogScreen from "./pages/BlogScreen";
import Header from "./components/Header";
import Layout from "./layouts/Layout";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import Private from "./components/Private";
function App() {
  return (
    <>
     <Header></Header>
      <Routes>
        <Route path="/"  >
          <Route index={true} element={<HomeScreen />}></Route>
        </Route>
        <Route path="/login" element={<LoginScreen />} /> 
        <Route path="/register" element={<RegisterScreen />} /> 
        {/* Private Route */}
        <Route path=""  element={<Private></Private>} >
            <Route path="/profile" element={<ProfileScreen /> }></Route>
        </Route>
      </Routes>
    </>
  );
}
// NavLink. <navigate to /> useNavigate(), useLocation, /* nested routes
export default App;
