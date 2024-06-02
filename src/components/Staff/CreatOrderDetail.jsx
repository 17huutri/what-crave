import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCatalog } from '../../store/slices/dishSlice';
import { createOrderDetail } from '../../store/slices/orderSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateOrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const catalog = useSelector((state) => state.dishes.catalog);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        dispatch(fetchCatalog());
    }, [dispatch]);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const onSubmit = async (data) => {
        const productID = getProductIDByName(data.productName);
        if (!productID || !data.quantity) {
            return;
        }
        try {
            await dispatch(createOrderDetail({ orderID: id, productID, quantity: data.quantity }));
            toast.success('Chi tiết đơn hàng đã được tạo thành công');
            setSelectedProduct('');
            setQuantity('');
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi tạo chi tiết đơn hàng');
        }
    };

    const getProductIDByName = (productName) => {
        const product = catalog.find((item) => item.name === productName);
        return product ? product.id : null;
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-amber-200 items-center px-4 mt-5 py-4">
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
                        Tên Sản Phẩm:
                    </label>
                    <select
                        id="productName"
                        {...register('productName')}
                        value={selectedProduct}
                        onChange={handleProductChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Chọn sản phẩm</option>
                        {catalog.map((product) => (
                            <option key={product.id} value={product.name}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
                        Số Lượng:
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        {...register('quantity', {
                            required: 'Số lượng là bắt buộc',
                            min: { value: 1, message: 'Số lượng phải lớn hơn hoặc bằng 1' },
                            max: { value: 99, message: 'Số lượng phải nhỏ hơn hoặc bằng 99' },
                        })}
                        min={1}
                        max={99}
                        className={`text-center py-1 mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errors.quantity ? 'border-red-500' : ''}`}
                    />
                    {errors.quantity && <span className="text-red-500 text-xs italic">{errors.quantity.message}</span>}
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Tạo món
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateOrderDetail;
