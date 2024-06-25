import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaMoneyBill, FaUser } from "react-icons/fa";
import { BiLogIn, BiDish } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setIsLogin, setRole } from "../../store/slices/accountSlice";
import storageService from "../../api/storageService";

const SidebarAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0.5,
            },
        },
    };

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        storageService.removeAccessToken();
        dispatch(setIsLogin(false));
        dispatch(setRole(""));
        storageService.removeRole();
        navigate("/");
    };

    const routes = [
        {
            path: "/admin/dashboard",
            name: "Dashboard",
            icon: <FaHome />,
            color: "#4CAF50",
        },
        {
            path: "/admin/staffs",
            name: "Nhân viên",
            icon: <FaUser />,
            color: "#2196F3",
        },
        {
            path: "/admin/products",
            name: "Món ăn",
            icon: <IoFastFoodSharp />,
            color: "#FF5722",
        },
        {
            path: "/admin/categories",
            name: "Phân loại món",
            icon: <BiDish />,
            color: "#F4ffff",
        },
        {
            path: "/admin/blogs",
            name: "Blogs",
            icon: <BsNewspaper />,
            color: "#FFC107",
        },
        {
            path: "/admin/payments",
            name: "Danh sách thanh toán",
            icon: <FaMoneyBill />,
            color: "#9C27B0",
        },
        {
            name: "Đăng xuất",
            icon: <BiLogIn />,
            color: "#F44336",
            onClick: handleLogout,
        },
    ];

    return (
        <div className="flex">
            <motion.div
                animate={{
                    width: isOpen ? "260px" : "45px",
                    transition: {
                        duration: 0.5,
                        type: "spring",
                        damping: 10,
                    },
                }}
                className="bg-black text-white h-[150vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between p-3">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.h1
                                variants={showAnimation}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="text-xl leading-0"
                            >
                                Admin Dashboard
                            </motion.h1>
                        )}
                    </AnimatePresence>

                    <div className="bars w-7 h-7">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <section className="mt-3 space-y-2">
                    {routes.map((route, index) => (
                        route.path ? (
                            <NavLink
                                key={index}
                                to={route.path}
                                className="flex justify-items-center text-white gap-10 p-2  group transition-transform transform duration-200 ease-in-out hover:border-white hover:bg-blue-700"
                                onClick={route.onClick}
                            >
                                <div className="w-6 h-6 ml-1" style={{ color: route.color }}>{route.icon}</div>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            variants={showAnimation}
                                            initial="hidden"
                                            animate="show"
                                            exit="hidden"
                                            className="whitespace-nowrap text-sm"
                                        >
                                            {route.name}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </NavLink>
                        ) : (
                            <div
                                key={index}
                                className="flex justify-items-center text-white gap-10 p-2  group transition-transform transform duration-200 ease-in-out hover:border-white hover:bg-blue-700"
                                onClick={route.onClick}
                            >
                                <div className="w-6 h-6 ml-1" style={{ color: route.color }}>{route.icon}</div>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            variants={showAnimation}
                                            initial="hidden"
                                            animate="show"
                                            exit="hidden"
                                            className="whitespace-nowrap text-sm"
                                        >
                                            {route.name}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    ))}
                </section>
            </motion.div>
        </div>
    );
};

export default SidebarAdmin;
