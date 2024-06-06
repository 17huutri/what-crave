import React from 'react';
import { Link } from 'react-router-dom';
import gifSection from '../../assets/landing_pages/bt.gif';
import imageSection from '../../assets/landing_pages/ui.png';


const TopSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center bg-[#ee7d7d] p-4">
                <img src={imageSection} alt="Image Section" className="!w-4/5 h-auto md:w-full border-4 border-main_color_1" data-aos='zoom-in-right'
                />
            </div>

            <div className="relative flex flex-col items-center justify-center bg-white p-4"
                data-aos='fade-up'
                data-aos-delay='400'
            >
                <h2 className="text-5xl font-cabin font-semibold text-[#ee7d7d] my-8">Thực đơn</h2>
                <div className="relative w-full flex items-center justify-center">
                    <img src={gifSection} alt="GIF Section" className="!w-4/5 h-auto md:w-full p-4 border-main_color_3 mb-8" />
                    <Link
                        to="/menu"
                        className="absolute bg-main_color_3 text-[#4e4f52] text-2xl italic font-beVn rounded-full px-4 py-4 transition duration-300 hover:bg-transparent hover:text-white border border-black flex flex-col items-center justify-center"
                    >
                        <span>Khám phá</span>
                        <span className="font-bold">Thực đơn</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopSection;
