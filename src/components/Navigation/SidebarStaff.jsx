import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaFirstOrderAlt, FaAmazonPay } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import storageService from "../../api/storageService";
import { setIsLogin, setRole } from "../../store/slices/accountSlice";

const SidebarStaff = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menus = [
        { name: "Menu", link: "/staff/menu", icon: MdOutlineRestaurantMenu, color: "#4CAF50" },
        { name: "Danh sách đặt món", link: "/staff/orders", icon: FaFirstOrderAlt, color: "#2196F3" },
        { name: "Thanh toán", link: "/staff/payment", icon: FaAmazonPay, color: "#FF5722" },
        { name: "Đăng xuất", link: "/logout", icon: FiLogOut, color: "#F44336", isLogout: true },
    ];
    const [open, setOpen] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        storageService.removeAccessToken();
        storageService.removeRole();

        dispatch(setIsLogin(false));
        dispatch(setRole(""));

        navigate("/");
    };

    return (
        <section className="flex gap-6">
            <div
                className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 md:block hidden`}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                        menu.isLogout ? (
                            <div
                                key={i}
                                onClick={handleLogout}
                                className={` ${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                            >
                                <div>{React.createElement(menu?.icon, { size: "20", color: menu.color })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                                >
                                    {menu?.name}
                                </h2>
                                <h2
                                    className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                                >
                                    {menu?.name}
                                </h2>
                            </div>
                        ) : (
                            <Link
                                to={menu?.link}
                                key={i}
                                className={` ${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                            >
                                <div>{React.createElement(menu?.icon, { size: "20", color: menu.color })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                                >
                                    {menu?.name}
                                </h2>
                                <h2
                                    className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                                >
                                    {menu?.name}
                                </h2>
                            </Link>
                        )
                    ))}
                </div>
            </div>

            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-black focus:outline-none"
                >
                    <HiMenuAlt3 size={26} />
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
                    <div className="bg-[#0e0e0e] h-full w-72 text-gray-100 px-4">
                        <div className="py-3 flex justify-end">
                            <HiMenuAlt3
                                size={26}
                                className="cursor-pointer"
                                onClick={() => setIsMenuOpen(false)}
                            />
                        </div>
                        <div className="mt-4 flex flex-col gap-4 relative">
                            {menus?.map((menu, i) => (
                                menu.isLogout ? (
                                    <div
                                        key={i}
                                        onClick={handleLogout}
                                        className={` ${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                                    >
                                        <div>{React.createElement(menu?.icon, { size: "20", color: menu.color })}</div>
                                        <h2 className="whitespace-pre">{menu?.name}</h2>
                                    </div>
                                ) : (
                                    <Link
                                        to={menu?.link}
                                        key={i}
                                        className={` ${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                                    >
                                        <div>{React.createElement(menu?.icon, { size: "20", color: menu.color })}</div>
                                        <h2 className="whitespace-pre">{menu?.name}</h2>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SidebarStaff;
