import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalog } from '../store/slices/dishSlice';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Menu = () => {
    const dispatch = useDispatch();
    const dishes = useSelector((state) => state.dishes.catalog);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                await dispatch(fetchCatalog());
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="mt-8 py-8 px-4 md:py-12 md:px-6">
                <h2 className='text-5xl lg:text-7xl leading-snug font-thin mb-5 font-cabin italic text-center'>Thực đơn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array(8).fill().map((_, index) => (
                        <div key={index} className="min-w-[250px]">
                            <Skeleton height={192} className="w-full mb-4" />
                            <Skeleton height={24} className="w-3/4 mb-2" />
                            <Skeleton height={16} className="w-full mb-4" />
                            <Skeleton height={20} className="w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const groupedDishes = dishes.reduce((acc, dish) => {
        const { categoryName } = dish;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(dish);
        return acc;
    }, {});

    return (
        <div className='py-8 px-4 sm:py-40 sm:px-6 md:py-24 md:px-8 lg:py-36 lg:px-32'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-[4] font-thin mb-5 font-cabin italic text-blue-950 text-center'>Thực đơn</h2>

            {Object.entries(groupedDishes).map(([categoryName, dishes]) => (
                <section key={categoryName} className="mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-inter mb-6 md:mb-8 lg:mb-10 pl-2 md:pl-4 text-blue-900">{categoryName}</h2>
                    <div className="flex overflow-x-scroll space-x-4 pb-4 no-scrollbar">
                        {dishes.map((item) => (
                            <Link key={item.id} to={`/menu/${item.id}`}>
                                <div className="min-w-[250px] bg-white rounded-lg shadow-lg p-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-64 h-48 object-cover rounded-md mb-4"
                                    />
                                    <h3 className="font-inter font-semibold mb-2 truncate">{item.name}</h3>
                                    <p className="text-sm sm:text-base md:text-lg text-blue-900 font-cabin">{item.price.toLocaleString('vi-VN')} đ</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Menu;
