import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Navigation/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
