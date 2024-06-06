import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCatalog } from '../../store/slices/dishSlice';
import { motion } from 'framer-motion'; // Import motion từ Framer Motion
import Breadcrumb from './../Breadcrumb';
import Logo from '../../assets/landing_pages/logo2.png';

const DishDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dishes = useSelector((state) => state.dishes.catalog);
    const dish = dishes.find(dish => dish.id.toString() === id);

    useEffect(() => {
        if (!dishes.length) {
            dispatch(fetchCatalog());
        }
    }, [dispatch, dishes.length]);





    if (!dish) {
        return <p className='py-36 text-center text-5xl'>Món ăn này không được tìm thấy</p>;
    }

    const getTimeGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 10) {
            return 'Chào buổi sáng';
        } else if (currentHour < 13) {
            return 'Chào buổi trưa';
        } else if (currentHour < 18) {
            return 'Chào buổi chiều';
        } else {
            return 'Chào buổi tối';
        }
    };

    return (
        <div className='pt-36 bg-amber-100'>
            <Breadcrumb />

            <div className="py-20 px-40">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center lg:items-start">
                        <h2 className="text-3xl lg:text-4xl !text-[#242e52] leading-snug font-semibold mb-5 font-cabin italic text-center lg:text-left">
                            {dish.name}
                        </h2>
                        <motion.img
                            src={dish.image}
                            alt={dish.name}
                            className="w-64 h-48 object-cover rounded-md mb-4"
                            whileHover={{ scale: 1.5 }}
                        />
                    </div>

                    <div className="flex flex-col items-center lg:items-start">
                        <h3 className="text-2xl font-semibold !text-[#242e52] mb-4 text-center lg:text-left">
                            Mô Tả:
                        </h3>
                        <p className="text-lg mb-4 text-center lg:text-left text-[#242e52]">
                            {dish.description}
                        </p>
                        <motion.p
                            className="text-lg text-white bg-[#242e52] px-4 py-2 rounded-md text-center lg:text-left"

                            whileHover={{ scale: 1.2 }}
                        >
                            {dish.price.toLocaleString('vi-VN')}  đ
                        </motion.p>
                    </div>

                    <motion.div
                        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md ring-1 ring-gray-800"
                        whileHover={{ scale: 1.05 }}
                    >

                        <h3 className="text-3xl font-semibold mb-4 text-gray-800 text-center ">
                            {getTimeGreeting()}
                        </h3>
                        <motion.p
                            className="text-3xl text-white bg-[#242e52] px-4 py-2 rounded-l-full text-center "
                            whileHover={{ scale: 1.1 }}
                        >
                            Chúc Quý Khách Ngon Miệng !
                        </motion.p>
                        <motion.img
                            src={Logo}
                            alt="Logo"
                            className="!w-4/5 h-auto md:w-full p-4 mb-8"
                            whileHover={{ rotate: 360 }}
                        />

                    </motion.div>
                </div>
            </div>
        </div>

    );
};

export default DishDetail;
