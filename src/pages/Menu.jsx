import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalog } from '../store/slices/dishSlice';
import { Link } from 'react-router-dom';

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
        return <p>Loading menu...</p>;
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
                        <Link key={item.id} to={`/menu/${item.id}`}>
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

export default Menu;
