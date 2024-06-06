import React from 'react';
import image1 from '../../assets/landing_pages/logogoc.png';
import image2 from '../../assets/landing_pages/box.png';
import { motion } from 'framer-motion';

const Words = () => {
    return (
        <div>
            <div className="py-20 bg-gradient-to-b from-[#ee7d7d] to-main_color_1 text-center text-main_color_3 px-4">
                <div className="px-16 py-20 lg:py-4 ml-8 text-white lg:text-left text-center">
                    <h2 className="text-5xl lg:text-7xl leading-snug mb-5 italic font-inter" data-aos="fade-up"
                        data-aos-duration="3000">"Câu Từ"</h2>
                    <p className="text-gray-100 lg:w-3/5 mx-auto lg:mx-0 font-beVn" data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">
                        Hành trình của - <span className="font-bold italic">Thèm Gì Cơ </span> thời gian vừa qua, không dài cũng chẳng ngắn, chúng mình được có cơ hội đón chào rất nhiều khách quý!
                    </p>
                    <p className="text-gray-100 lg:w-3/5 mx-auto lg:mx-0 font-beVn" data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">
                        Và cũng được vinh dự nhận lại những <span className="font-bold italic">"Câu Từ"</span> nhận xét, khen ngợi, góp ý...
                    </p>
                    <p className="text-gray-100 lg:w-3/5 mx-auto lg:mx-0 font-beVn" data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">
                        <span className="font-bold italic">Thèm Gì Cơ </span>xin gửi <span className="font-bold italic">lời cảm ơn và xin được tri ân</span> những<span className="font-bold italic">"Câu Từ"</span> mà chúng mình được nhận lại rất nhiều.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-6 border border-white hover:animate-shake">
                                <span className="font-bold italic">Bị ghiền</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                            <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-3 border border-white hover:animate-shake">
                                <span className="font-bold italic">Tính tiền</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform -rotate-4 border border-white hover:animate-shake">
                                <span className="font-bold italic">Dưỡng thê</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-45 border border-white hover:animate-shake">
                                <span className="font-bold italic">Chị ơi</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-8 border border-white hover:animate-shake">
                                <span className="font-bold italic">Thêm nữa nha</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-12 border border-white hover:animate-shake">
                                <span className="font-bold italic">Ăn gì cũng được</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-2 border border-white hover:animate-shake">
                                <span className="font-bold italic">Ngon xinh yêu luôn</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-45 border border-white hover:animate-shake">
                                <span className="font-bold italic">Lần sau đến nữa nha</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-12 border border-white hover:animate-shake">
                                <span className="font-bold italic">EEhh, nhưng mà ngon nha</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform -rotate-6 border border-white hover:animate-shake">
                                <span className="font-bold italic">Nhiều ghê</span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-full flex justify-end"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >                               <div className="rounded-full bg-opacity-10 px-3 py-1 text-lg lg:text-xl transform rotate-12 border border-white hover:animate-shake">
                                <span className="font-bold italic">Khoái khoái </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex items-center justify-center bg-main_color_1 px-10">
                    <img src={image2} alt="Image2" className="w-full h-auto md:w-full rounded-full hover:animate-shake mb-10" />
                </div>

                <div className="relative flex flex-col items-center justify-end bg-main_color_1 pb-20">
                    <div className="relative w-full flex items-start justify-between">
                        <div className="flex flex-col items-start justify-center md:w-1/2 p-4">
                            <div className="flex flex-col">
                                <span className="px-8 font-inter text-2xl lg:text-2xl text-main_color_3 whitespace-nowrap">Sản phẩm độc quyền của</span>
                                <h2 className="text-center text-2xl lg:text-3xl text-main_color_3 leading-snug mb-5 italic font-beVn font-bold whitespace-nowrap">Thèm Gì Cơ</h2>
                            </div>
                            <p className="text-center text-base lg:text-lg text-main_color_3 mt-2 italic font-cabin" data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom">Đặt trải nghiệm của khách hàng lên hàng đầu - Thèm Gì Cơ hân hạnh giới thiệu loạt sản phẩm “nhà làm” không làm bạn thất vọng cả về chất lượng và hình thức</p>
                        </div>
                        <div className="flex items-center justify-center md:w-1/2">

                            <motion.img
                                src={image1}
                                alt='Image1'
                                className="h-auto w-full"
                                whileHover={{ rotate: -30 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Words;
