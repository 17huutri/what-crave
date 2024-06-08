import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaFacebook, FaXmark, FaBars, FaTiktok, FaInstagram } from 'react-icons/fa6'
import Modal from '../Modal';



const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    //navItems 
    const navItems = [
        { path: "/", link: "BÁNH TRÁNG" },
        { path: "/about", link: "VỀ THÈM" },
        { path: "/menu", link: "THỰC ĐƠN" },
        { path: "/blogs", link: "BLOG" },
        { path: "/contact", link: "LIÊN HỆ" },


    ]
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    return (
        <header className='bg-main_color_3 text-black fixed top-0 left-0 right-0 z-20'>
            <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-end'>
                <a href="/" className='text-xl font-bold text-main_color_1'>THÈM  <span className='text-gray-600 font-beVn font-bold'>GÌ CƠ?</span></a>
                <ul className='md:flex gap-12 text-lg hidden'>
                    {
                        navItems.map(({ path, link }) => <li className='text-gray-600 font-cabin font-semibold' key={path}>
                            <NavLink className={({ isActive, isPending }) =>
                                isActive
                                    ? "active text-main_color_1"
                                    : isPending
                                        ? "pending"
                                        : ""


                            } to={path}>{link}</NavLink>
                        </li>)
                    }

                </ul>
                {/* menu icons */}
                <div className='lg:flex gap-4 items-center hidden'>
                    <a href="https://www.facebook.com/profile.php?id=61557561740900" className='hover:text-main_color_1'><FaFacebook /></a>
                    <a href="/" className='hover:text-main_color_1'><FaInstagram /></a>
                    <a href="/" className='hover:text-main_color_1'><FaTiktok /></a>
                    <button onClick={openModal} className='bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white
                    hover:text-orange-500 transition-all duration-200 ease-in'>Đăng nhập</button>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='cursor-pointer'>
                        {
                            isMenuOpen ? <FaXmark className='w-5 h-5' /> : <FaBars className='w-5 h-5'></FaBars>
                        }
                    </button>
                </div>
            </nav>
            <div>
                <ul className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${isMenuOpen ? "fixed top-0 left-0 w-full translate-all ease-out duration-150" : "hidden"} `}>
                    {
                        navItems.map(({ path, link }) => <li className='text-black' key={path}>
                            <NavLink onClick={toggleMenu} to={path}>{link}</NavLink>
                        </li>)
                    }
                </ul>
            </div>
        </header >
    )
}
export default Navbar
