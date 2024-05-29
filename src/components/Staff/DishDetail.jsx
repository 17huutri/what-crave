import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DishDetail = () => {
    const { id } = useParams();
    const dish = useSelector((state) => state.dishes.catalog.find((item) => item.id === parseInt(id)));
    const [quantity, setQuantity] = useState(1);
    const [tablenumber, setTablenumber] = useState('');
    const [mode, setMode] = useState('');
    const [numberGuest, setNumberGuest] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const totalPrice = dish ? dish.price * quantity : 0;

    const handleOrder = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`https://themgico_node.nguyenminhhai.us/api/order`, {
                tablenumber: tablenumber,
                mode: mode,
                numberguest: numberGuest,
                Total: totalPrice
            });
            console.log(response.data.message);
            setOrderSuccess(true);
        } catch (error) {
            console.error('Error placing order:', error);
            setError(error.response.data.message || 'Không thể đặt món lúc này. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, value);
        setQuantity(newQuantity);
    };

    const handleNumberGuestChange = (value) => {
        const newNumberGuest = Math.max(1, value);
        setNumberGuest(newNumberGuest);
    };

    if (!dish) {
        return <p>Món ăn không tồn tại hoặc không có sẵn.</p>;
    }

    return (
        <div className='py-8 px-4 md:py-12 md:px-6 flex flex-wrap'>
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-64 h-48 object-cover rounded-md mb-4"
                />
            </div>
            <div className="w-full md:w-1/2 px-4 py-4">
                <h2 className='text-3xl md:text-5xl leading-snug font-thin mb-4 md:mb-6 font-cabin italic text-center md:text-left'>Chi tiết món ăn</h2>
                <h3 className="text-xl md:text-3xl font-semibold mb-2">{dish.name}</h3>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <p className="text-lg font-bold">{dish.price}</p>

                <div className="flex flex-col space-y-4 mt-4">
                    <div className="flex items-center space-x-4">
                        <label className="block text-gray-700">Số lượng:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                            className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-main_color_1"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="block text-gray-700">Số lượng khách:</label>
                        <input
                            type="number"
                            value={numberGuest}
                            onChange={(e) => handleNumberGuestChange(parseInt(e.target.value))}
                            className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-main_color_1"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="block text-gray-700">Số bàn:</label>
                        <input
                            type="text"
                            value={tablenumber}
                            onChange={(e) => setTablenumber(e.target.value)}
                            className="w-40 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-main_color_1"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="block text-gray-700">Chế độ:</label>
                        <input
                            type="text"
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="w-40 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-main_color_1"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="block text-gray-700">Tổng tiền:</span>
                        <span className="font-semibold">{totalPrice.toLocaleString()} đ</span>
                    </div>
                    {!orderSuccess ? (
                        <button
                            onClick={handleOrder}
                            disabled={isLoading}
                            className={`mt-4 px-4 py-2 rounded-lg transition duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-main_color_1 hover:bg-blue-600 text-white font-semibold'
                                }`}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Đặt món'}
                        </button>
                    ) : (
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 rounded-lg text-white font-semibold"
                            disabled
                        >
                            Đã đặt thành công
                        </button>
                    )}
                    {error && <p className="text-red-500 mt-2">{error}</p >}
                </div>
            </div>
        </div>
    );
};

export default DishDetail;
