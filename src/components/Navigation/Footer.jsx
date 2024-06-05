import react, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { FaFacebook, FaXmark, FaBars, FaTiktok, FaInstagram } from 'react-icons/fa6'
import img1 from '../../../public/assets/landing_pages/frame1.png';



const Footer = () => {




    const footerPages = [
        { path: '/', link: 'Home' },
        { path: '/about', link: 'About' },
        { path: '/menu', link: 'Menu' },
        { path: '/princing', link: 'Princing' },
        { path: '/blog', link: 'Blog' },
        { path: '/contact', link: 'Contact' },
        { path: '/delivery', link: 'Delivery' },
    ]

    const utilityPages = [
        'Start Here',
        'Styleguide',
        'Password Protected',
        '404 Not Found',
        'Licenses',
        'Changelog',
        'View More'
    ]
    return (
        <footer className='min-h-[778px] relative bg-zinc-700 lg:py-20' >
            <nav className='px-4 py-4 max-w-7xl mx-auto justify-between items-start text-gray-300 grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                    <div className='py-8 '>
                        <p>
                            Trong  nghệ mới, chúng tôi nhìn về
                        </p>
                        <p>
                            tương lai với sự chắc chắn và tự hào về
                        </p>
                        <p>
                            cửa hàng của mình
                        </p>

                    </div>
                    {/* menu icons */}
                    <div className='flex gap-5 items-center text-2xl pb-8'>
                        <a href="/" className='hover:text-main_color_1'><FaFacebook /></a>
                        <a href="/" className='hover:text-main_color_1'><FaInstagram /></a>
                        <a href="/" className='hover:text-main_color_1'><FaTiktok /></a>

                    </div>
                </div>
                <div className=' grid gap-x-8 gap-y-4 grid-cols-2'>
                    <ul className=''>
                        <li className='text-white text-base font-bold pb-12'>
                            Pages
                        </li>
                        {
                            footerPages.map(({ path, link }) =>
                                <li className='pb-6 hover:opacity-80' key={path}>
                                    <NavLink className={({ isActive, isPending }) =>
                                        isActive
                                            ? "active"
                                            : isPending
                                                ? "pending"
                                                : ""
                                    } to={path}>{link}</NavLink>
                                </li>)
                        }
                    </ul>
                    <ul>
                        <li className='text-white text-base font-bold pb-12'>
                            Utility Pages
                        </li>
                        {
                            utilityPages.map((utilityPage, index) =>
                                <li className='pb-6 hover:opacity-80' key={index}>
                                    {utilityPage}
                                </li>)
                        }
                    </ul>
                </div>
                <div className='inline-block'>
                    <span className='text-white text-base font-bold pb-12 inline-block'>Follow Us On Instagram</span>
                    <div className='grid gap-4 grid-cols-2'>
                        <div className='max-w-[194px] rounded-xl hover:opacity-80'>
                            <img src={img1} alt="" />
                        </div>
                        <div className='max-w-[194px] rounded-xl hover:opacity-80'>
                            <img src={img1} alt="" />
                        </div>
                        <div className='max-w-[194px] rounded-xl hover:opacity-80'>
                            <img src={img1} alt="" />
                        </div>
                        <div className='max-w-[194px] rounded-xl hover:opacity-80'>
                            <img src={img1} alt="" />
                        </div>
                    </div>
                </div>
            </nav>

            <div>
                <p className='text-base py-6 text-center text-gray-400 lg:pt-10'>
                    Copyright © 2024 Hashtag Developer. All Rights Reserved
                </p>
            </div>


        </footer>
    )
}
export default Footer