import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setIsLogin, setRole } from "./store/slices/accountSlice";
import storageService from "./api/storageService";
import { ROLE } from "./api/constant_api";

import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import MainLayout from "./layouts/MainLayout";
import StaffLayout from "./layouts/StaffLayout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MenuStaff from "./components/Staff/MenuStaff";
import DishDetail from "./components/Staff/DishDetail";

const App = () => {
  const { isLogin, role } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const token = storageService.getAccessToken();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > decodedToken.exp) {
        storageService.setAccessToken("");
        dispatch(setIsLogin(false));
        storageService.removeRole();
        dispatch(setRole(""));
      } else {
        dispatch(setIsLogin(true));
        dispatch(setRole(decodedToken[ROLE]));
        storageService.setRole(decodedToken[ROLE]);
      }
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route element={<ProtectedRoute isAllowed={!isLogin || (role !== "staff" && role !== "admin")} redirectPath={role === "staff" ? "/staff" : "/admin"} />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<DishDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Route>
        {/* Staff Layout */}
        <Route element={<ProtectedRoute isAllowed={isLogin && role === "staff"} redirectPath="/login" />}>
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<Navigate to="/staff" />} />
            <Route path="menu" element={<MenuStaff />} />
            <Route path="/staff/menu/:id" element={<DishDetail />} />
          </Route>
        </Route>


        {/* Admin Layout */}
        <Route element={<ProtectedRoute isAllowed={isLogin && role === "admin"} redirectPath="/login" />}>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
          </Route>
        </Route>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            <ProtectedRoute isAllowed={!isLogin} redirectPath="/">
              <Login />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

