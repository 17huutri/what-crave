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
import BlogDetail from "./components/Blog/BlogDetail";
import StaffPage from "./components/Admin/StaffPage";
import ProductPage from "./components/Admin/ProductPage";
import ScrollToTop from "./components/Navigation/ScrollToTop";

const App = () => {
  const { isLogin, role } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = storageService.getAccessToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > decodedToken.exp) {
          storageService.setAccessToken("");
          storageService.removeRole();
          dispatch(setIsLogin(false));
          dispatch(setRole(""));
        } else {
          dispatch(setIsLogin(true));
          dispatch(setRole(decodedToken[ROLE]));
          storageService.setRole(decodedToken[ROLE]);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        storageService.setAccessToken("");
        storageService.removeRole();
        dispatch(setIsLogin(false));
        dispatch(setRole(""));
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main Layout */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!isLogin || (role !== "staff" && role !== "admin")}
              redirectPath={role === "staff" ? "/staff" : "/admin"}
            />
          }
        >
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
          path="/staff"
          element={<ProtectedRoute isAllowed={isLogin && role === "staff"} redirectPath="/login" />}
        >
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<Navigate to="/staff/menu" />} />
            <Route path="/staff/menu" element={<MenuStaff />} />
            <Route path="/staff/orders" element={<OrderList />} />
            <Route path="/staff/order/:id" element={<OrderDetail />} />
            <Route path="/staff/status-success-payment" element={<PaymentSuccess />} />
            <Route path="/staff/status-failure-payment" element={<PaymentFailure />} />
            <Route path="/staff/payment" element={<Payment />} />
            <Route path="/staff/change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Admin Layout */}
        <Route
          path="/admin"
          element={<ProtectedRoute isAllowed={isLogin && role === "admin"} redirectPath="/login" />}
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/staffs" element={<StaffPage />} />
            <Route path="/admin/products" element={<ProductPage />} />
            <Route path="/admin/payments" element={<PaymentList />} />
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

        {/* Catch-All NotFound Route */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
