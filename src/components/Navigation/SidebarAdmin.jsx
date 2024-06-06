import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaMoneyBill, FaUser } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";

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
        },
        {
            path: "/admin/staffs",
            name: "Nhân viên",
            icon: <FaUser />,
        },
        {
            path: "/admin/blogs",
            name: "Blogs",
            icon: <BsNewspaper />,
        },
        {
            path: "/admin/payments",
            name: "Danh sách thanh toán",
            icon: <FaMoneyBill />,
        },
        {
            name: "Logout",
            icon: <BiLogIn />,
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
                className="bg-black text-white h-screen overflow-y-auto"
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
                                <div className="w-6 h-6 ml-1">{route.icon}</div>
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
                                <div className="w-6 h-6 ml-1">{route.icon}</div>
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
