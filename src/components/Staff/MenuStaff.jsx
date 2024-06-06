import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCatalog } from '../../store/slices/dishSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MenuStaff = () => {
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

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='py-36 px-4'>
            <h2 className='text-5xl lg:text-7xl leading-snug font-thin mb-5 font-cabin italic text-center'>Thực đơn</h2>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-10 pl-4">Thèm Bánh Tráng</h2>
                <div className="flex overflow-x-scroll space-x-4 pb-4 no-scrollbar">
                    {dishes.map((item) => (
                        <Link key={item.id} to={`/staff/menu/${item.id}`}>
                            <div className="min-w-[250px] bg-white rounded-lg shadow-lg p-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-64 h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                <p className="text-lg font-bold">{item.price.toLocaleString('vi-VN')}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MenuStaff;
