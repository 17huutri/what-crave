import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    const dishes = useSelector((state) => state.dishes.catalog);

    const getDishName = (id) => {
        const dish = dishes.find(dish => dish.id.toString() === id);
        return dish ? dish.name : id;
    };

    return (
        <nav className="breadcrumb">
            <ul className="flex space-x-2">
                <li>
                    <Link to="/" className="text-black font-inter font-semibold ml-6">Trang chủ</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <li key={to}>
                            <span className="mx-1 sm:mx-2">{">"}</span>                            {isLast ? (
                                <span className='text-black font-inter font-semibold text-sm sm:text-base'>{index === 1 && dishes.length ? getDishName(value) : value}</span>
                            ) : (
                                <Link to={to} className="text-black font-inter font-semibold capitalize">{value}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
