import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    const itemsData = [
        {
            id: 1,
            name: 'Bánh Tráng Trộn',
            description: 'Bánh tráng trộn thơm ngon với nhiều loại topping.',
            price: '20,000 VND',
            image: 'https://ss-images.saostar.vn/pc/1676515058227/saostar-zzi4ejmv2y7mcvy0.jpg',
        },
        {
            id: 2,
            name: 'Bánh Tráng Nướng',
            description: 'Grilled rice paper with a crispy texture and tasty fillings.',
            price: '25,000 VND',
            image: 'https://static.vinwonders.com/production/banh-trang-nuong-da-lat-1.jpg',
        },
        {
            id: 3,
            name: 'Bánh Tráng Trộn',
            description: 'Bánh tráng trộn thơm ngon với nhiều loại topping.',
            price: '20,000 VND',
            image: 'https://ss-images.saostar.vn/pc/1676515058227/saostar-zzi4ejmv2y7mcvy0.jpg',
        },
        {
            id: 4,
            name: 'Bánh Tráng Nướng',
            description: 'Grilled rice paper with a crispy texture and tasty fillings.',
            price: '25,000 VND',
            image: 'https://static.vinwonders.com/production/banh-trang-nuong-da-lat-1.jpg',
        },
        {
            id: 5,
            name: 'Bánh Tráng Trộn',
            description: 'Bánh tráng trộn thơm ngon với nhiều loại topping.',
            price: '20,000 VND',
            image: 'https://ss-images.saostar.vn/pc/1676515058227/saostar-zzi4ejmv2y7mcvy0.jpg',
        },
        {
            id: 6,
            name: 'Bánh Tráng Nướng',
            description: 'Grilled rice paper with a crispy texture and tasty fillings.',
            price: '25,000 VND',
            image: 'https://static.vinwonders.com/production/banh-trang-nuong-da-lat-1.jpg',
        },
        {
            id: 7,
            name: 'Bánh Tráng Trộn',
            description: 'Bánh tráng trộn thơm ngon với nhiều loại topping.',
            price: '20,000 VND',
            image: 'https://ss-images.saostar.vn/pc/1676515058227/saostar-zzi4ejmv2y7mcvy0.jpg',
        },
        {
            id: 8,
            name: 'Bánh Tráng Nướng',
            description: 'Grilled rice paper with a crispy texture and tasty fillings.',
            price: '25,000 VND',
            image: 'https://static.vinwonders.com/production/banh-trang-nuong-da-lat-1.jpg',
        },
    ];



    return (
        <div className='py-36 px-4'>
            <h2 className='text-5xl lg:text-7xl leading-snug font-thin mb-5 font-cabin italic text-center'>Thực đơn</h2>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-10 pl-4">Thèm Bánh Tráng</h2>
                <div className="flex overflow-x-scroll space-x-4 pb-4 no-scrollbar">
                    {itemsData.map(item => (
                        <Link to={`/menu/${item.id}`} key={item.id} className="min-w-[250px] bg-white rounded-lg shadow-lg p-4">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <p className="text-lg font-bold">{item.price}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Menu;
