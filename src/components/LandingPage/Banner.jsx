import React from 'react'
import videoBanner from '../../../public/assets/landing_pages/banner.mp4'
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6'
const Banner = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/menu');
    };
    return (
        <div className="relative h-screen overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={videoBanner}
                autoPlay
                muted
                loop
            />
            <div className="relative z-10 px-16 py-20 lg:py-96 ml-8 text-white lg:text-left text-center">
                <h1 className='text-5xl lg:text-7xl leading-snug  mb-5 font-beVn italic  '>Sự Lựa Chọn Hoàn Hảo</h1>
                <p className='text-gray-100 lg:w-3/5 mx-auto lg:mx-0 font-beVn'>Khám phá món ăn vặt ngon lành và những khoảnh khắc khó quên tại cửa hàng thân thiện của chúng tôi.</p>
                <p className='text-gray-100 lg:w-3/5 mx-auto lg:mx-0 font-beVn'>Mỏng manh, giòn tan, bánh tráng có thể được ăn độc lập hoặc kết hợp cùng các gia vị. Sự kết hợp này mang đến những hương vị đậm đà, khó quên cho người thưởng thức.</p>

                <p className='text-gray-100 lg:w-3/5 mx-auto lg:mx-0 font-beVn'>Với đội ngũ nhân viên thân thiện và không gian ấm cúng, chúng tôi luôn sẵn sàng mang đến cho bạn những trải nghiệm tuyệt vời khi thưởng thức món bánh tráng đặc trưng của Việt Nam.</p>
                <p className='text-gray-100 lg:w-3/5 mx-auto lg:mx-0 font-beVn'>Hãy ghé thăm ngay và cùng khám phá hương vị truyền thống!</p>
                <div>
                    <button
                        onClick={handleClick}
                        className='mt-4 font-medium inline-flex items-center py-2 px-4 bg-main_color_1 text-white rounded-full hover:bg-blue-600 transition duration-300'
                    >
                        Khám phá ngay
                        <FaArrowRight className='ml-2' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Banner
