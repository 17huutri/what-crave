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
import OrderList from "./components/Staff/OrderList";
import OrderDetail from "./components/Staff/OrderDetail";
import NotFound from "./components/NotFound";
import Payment from "./components/Staff/Payment";
import ChangePassword from "./components/Staff/ChangePassword";
import PaymentSuccess from "./components/PaymentStatus/PaymentSuccess";
import PaymentFailure from "./components/PaymentStatus/PaymentFailure";
import DashboardPage from "./pages/DashboardPage";
import PaymentList from "./components/Admin/PaymentList";
import CreateBlog from "./components/Admin/CreateBlog";
import BlogDetail from "./components/Blog/BlogDetail";


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
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />

            <Route path="/contact" element={<Contact />} />
          </Route>
        </Route>

        {/* Staff Layout */}

        <Route
          path="/staff" element={<StaffLayout redirectPath="/login" isAllowed={role === "staff"} />} >
          <Route index element={<Navigate to="/staff/menu" />} />
          <Route path="/staff/menu" element={<MenuStaff />} />

          <Route path="/staff/orders" element={<OrderList />} />
          <Route path="/staff/order/:id" element={<OrderDetail />} />
          <Route path="/staff/status-success-payment" element={<PaymentSuccess />} />
          <Route path="/staff/status-failure-payment" element={<PaymentFailure />} />

          <Route path="/staff/payment" element={<Payment />} />

          <Route path="/staff/change-password" element={<ChangePassword />} />



        </Route>



        {/* Admin Layout */}

        <Route
          path="/admin" element={<AdminLayout redirectPath="/login" isAllowed={role === "admin"} />} >
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/payments" element={<PaymentList />} />
          <Route path="/admin/blogs" element={<CreateBlog />} />


        </Route>

        <Route path="/*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;

