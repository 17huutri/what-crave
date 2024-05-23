import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const dishes = [
    {
        id: 1,
        name: 'Bánh Tráng Trộn',
        description: 'Bánh tráng trộn thơm ngon với nhiều loại topping.',
        basePrice: 20000,
        image: 'https://ss-images.saostar.vn/pc/1676515058227/saostar-zzi4ejmv2y7mcvy0.jpg',
    },
    {
        id: 2,
        name: 'Bánh Tráng Nướng',
        description: 'Grilled rice paper with a crispy texture and tasty fillings.',
        basePrice: 25000,
        image: 'https://static.vinwonders.com/production/banh-trang-nuong-da-lat-1.jpg',
    },
];

const DishDetail = () => {
    const { dishId } = useParams();
    const dish = dishes.find(d => d.id === parseInt(dishId));

    const [size, setSize] = useState('Size S');
    const [spiceLevel, setSpiceLevel] = useState('Không cay');
    const [toppings, setToppings] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(dish ? dish.basePrice : 0);

    const sizes = [
        { name: 'Size S', price: 0 },
        { name: 'Size M', price: 5000 },
        { name: 'Size L', price: 10000 },
    ];

    const spiceLevels = [
        { name: 'Không cay', price: 0 },
        { name: 'Cay', price: 0 },
    ];

    const availableToppings = [
        { name: 'Khô bò', price: 7000 },
        { name: 'Khô gà', price: 5000 },
        { name: 'Khô heo', price: 5000 },
        { name: 'Khô bò nướng', price: 10000 },
        { name: 'Tóp mỡ', price: 7000 },
        { name: 'Trứng cút', price: 5000 },
    ];

    const availableSauces = [
        { name: 'Sốt me', price: 3000 },
        { name: 'Sốt tắc', price: 3000 },
        { name: 'Sốt muối béo', price: 3000 },
    ];

    useEffect(() => {
        if (dish) {
            let newPrice = dish.basePrice;

            const selectedSize = sizes.find(s => s.name === size);
            if (selectedSize) newPrice += selectedSize.price;

            const selectedToppings = availableToppings.filter(t => toppings.includes(t.name));
            selectedToppings.forEach(t => newPrice += t.price);

            const selectedSauces = availableSauces.filter(s => sauces.includes(s.name));
            selectedSauces.forEach(s => newPrice += s.price);

            setTotalPrice(newPrice * quantity);
        }
    }, [size, spiceLevel, toppings, sauces, quantity, dish]);

    const handleToggle = (item, setItems, items) => {
        setItems(items.includes(item) ? items.filter(i => i !== item) : [...items, item]);
    };

    if (!dish) return <div>Dish not found</div>;

    return (
        <div className="container mx-auto px-4 py-8 lg:py-16">
            <div className="flex flex-col lg:flex-row">
                <img src={dish.image} alt={dish.name} className="w-full lg:w-1/2 h-auto object-cover rounded-lg mb-4 lg:mb-0" />
                <div className="lg:ml-8 flex-1">
                    <h1 className="text-2xl lg:text-4xl font-bold mb-4">{dish.name}</h1>
                    <p className="text-gray-700 mb-4">{dish.description}</p>
                    <p className="text-xl lg:text-2xl font-semibold mb-6">{dish.basePrice.toLocaleString()} VND</p>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Chọn size:</label>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map(s => (
                                <label key={s.name} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="size"
                                        value={s.name}
                                        checked={size === s.name}
                                        onChange={() => setSize(s.name)}
                                        className="mr-2"
                                    />
                                    {s.name} (+{s.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })})
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Chọn loại:</label>
                        <div className="flex flex-wrap gap-2">
                            {spiceLevels.map(s => (
                                <label key={s.name} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="spiceLevel"
                                        value={s.name}
                                        checked={spiceLevel === s.name}
                                        onChange={() => setSpiceLevel(s.name)}
                                        className="mr-2"
                                    />
                                    {s.name} ({s.price.toLocaleString()} VND)
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Thêm topping:</label>
                        <div className="flex flex-wrap gap-2">
                            {availableToppings.map(t => (
                                <label key={t.name} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={toppings.includes(t.name)}
                                        onChange={() => handleToggle(t.name, setToppings, toppings)}
                                        className="mr-2"
                                    />
                                    {t.name} (+{t.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })})
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Chọn sốt chấm:</label>
                        <div className="flex flex-wrap gap-2">
                            {availableSauces.map(s => (
                                <label key={s.name} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={sauces.includes(s.name)}
                                        onChange={() => handleToggle(s.name, setSauces, sauces)}
                                        className="mr-2"
                                    />
                                    {s.name} (+{s.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })})
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Ghi chú:</label>
                        <textarea className="w-full p-2 border border-gray-300 rounded-lg" rows="3"></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Số lượng:</label>
                        <div className="flex items-center">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 bg-gray-300 rounded-l-lg">-</button>
                            <span className="px-3 py-1 border-t border-b border-gray-300">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 bg-gray-300 rounded-r-lg">+</button>
                        </div>
                    </div>

                    <button className="px-6 py-3 bg-main_color_1 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
                        Thêm vào giỏ hàng ({totalPrice.toLocaleString()} VND)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DishDetail;
