import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../store/slices/newsSlice';
import { FaArrowRight } from 'react-icons/fa6';

const TopNews = () => {
    const dispatch = useDispatch();
    const { news } = useSelector(state => state.news);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const topThreeNews = news.slice(0, 3);

    return (
        <div>
            <div className="py-20 bg-gradient-to-b from-main_color_1 to-[#f0eded] text-center text-main_color_3 px-4">

                <div className='lg:px-14 max-w-screen-2xl mx-auto my-12'>
                    <div className='text-center md:w-1/2 mx-auto' data-aos="fade-up">
                        <h2 className='text-5xl lg:text-7xl leading-snug  mb-5 font-beVn italic'>"Không chỉ đơn giản là bánh tráng"</h2>
                        <p className='font-inter mb-8 md:w-3/4 mx-auto text-white' data-aos="fade-up">Ẩm thực Việt Nam phong phú từ món truyền thống đến sáng tạo hiện đại, mang đậm hương vị văn hóa, cùng sự đa dạng và sáng tạo không ngừng.</p>
                    </div>

                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 items-center justify-center'>
                        {topThreeNews.map((newsItem, index) => (
                            <div key={newsItem.id} className="mx-auto relative mb-12 cursor-pointer" data-aos="fade-up" data-aos-delay={index * 100}>
                                <img src={newsItem.image} alt="" className='object-cover w-full h-64 md:h-48 lg:h-56 hover:scale-95 transition-all duration-300 rounded-md' />
                                <div className='text-center px-4 py-8 bg-main_color_3 shadow-lg rounded-md md:w-3/4 hover:scale-95 transition-all duration-300  mx-auto absolute left-0 right-0 -bottom-12'>
                                    <h3 className="mb-3 text-neutral-700 font-bold font-inter">{newsItem.title}</h3>
                                    <div className="flex items-center justify-center gap-8">
                                        <a
                                            href='/'
                                            className='font-bold text-green-600 hover:text-neutral-700 inline-flex items-center'
                                        >
                                            Xem thêm <FaArrowRight className='ml-2' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopNews;
