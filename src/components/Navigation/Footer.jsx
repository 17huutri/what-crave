import { NavLink } from "react-router-dom";
import { FaFacebook, FaXmark, FaBars, FaTiktok, FaInstagram } from 'react-icons/fa6'



const Footer = () => {

    const footerPages = [
        { path: '/', link: 'Trang chủ' },
        { path: '/about', link: 'Về Thèm' },
        { path: '/menu', link: 'THực đơn' },
        { path: '/princing', link: 'Chính sách' },
        { path: '/blog', link: 'Blog' },
        { path: '/contact', link: 'Liên hệ' },
    ]

    const utilityPages = [
        'Bắt đầu',
        'Hướng dẫn mẫu',
        'Mật khẩu được bảo vệ',
        '404 không tìm thấy',
        'Giấy phép',
        'Nhật ký thay đổi',
        'Xem thêm'
    ]
    return (
        <footer className='min-h-[778px] relative bg-zinc-700 lg:py-20' >
            <nav className='px-4 py-4 max-w-7xl mx-auto justify-between items-start text-gray-300 grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                    <div className='py-8 '>
                        <p>
                            Chúng tôi nhìn về
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
                            Trang
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
                            Trang tiện ích
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
                    <span className='text-white text-base font-bold pb-12 inline-block'>
                        Theo dõi chúng tôi trên Instagram</span>
                    <div className='grid gap-4 grid-cols-2'>
                        <div className='max-w-[194px] max-h-[200px] rounded-xl hover:opacity-80'>
                            <img src="https://bizweb.dktcdn.net/100/393/670/articles/lam-banh-trang-tron-can-nhung-nguyen-lieu-gi.jpg?v=1604292199063" />
                        </div>
                        <div className='max-w-[194px] max-h-[200px] rounded-xl hover:opacity-80'>
                            <img src="https://yummyday.vn/uploads/images/cach-lam-banh-trang-tron-chay-2.jpg" />
                        </div>
                        <div className='max-w-[194px] max-h-[200px] rounded-xl hover:opacity-80'>
                            <img src="https://static.hawonkoo.vn/hwks1/images/2023/08/cach-lam-banh-trang-nuong-bang-noi-chien-khong-dau-3.jpg" />
                        </div>
                        <div className='max-w-[194px] max-h-[200px] rounded-xl hover:opacity-80'>
                            <img src="https://photo.znews.vn/w660/Uploaded/vhuowar/2017_03_15/11193341_750308295086128_6051964005409488538_n.jpg" />
                        </div>

                    </div>
                </div>
            </nav>

            <div>
                <p className='text-base pt-20  text-center text-gray-400'>
                    Copyright © 2024 Hashtag Developer. All Rights Reserved
                </p>
            </div>


        </footer>
    )
}
export default Footer