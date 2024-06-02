import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderById, updateMode } from '../../store/slices/orderSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateOrderDetail from './CreatOrderDetail';
import { PacmanLoader } from 'react-spinners';
const OrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, isLoading, error } = useSelector((state) => state.orders);
    const [showModal, setShowModal] = useState(false);
    const [selectedMode, setSelectedMode] = useState(null);

    useEffect(() => {
        dispatch(fetchOrderById(id));
    }, [dispatch, id]);



    const handleUpdateMode = async (mode) => {
        if (!mode) {
            toast.error('Vui lòng chọn chế độ');
            return;
        }
        try {
            await dispatch(updateMode({ orderID: id, mode }));
            toast.success(`Cập nhật chế độ thành công: ${mode}`);
            setShowModal(false);
            setSelectedMode(null);
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi cập nhật chế độ');
        }
    };

    if (isLoading) {
        return <div className="flex justify-center mt-40"><PacmanLoader color='#728FCE' size={70} />
        </div>;

    }

    if (error) {
        return <div className="flex justify-center mt-40"><PacmanLoader color='#728FCE' size={70} />
        </div>;
    }

    if (!order) {
        return <div className="flex justify-center mt-40"><PacmanLoader color='#728FCE' size={70} />
        </div>;
    }
    return (
        <div className="mt-8 py-8 px-4 md:py-12 md:px-6">
            <h2 className="text-3xl font-semibold mb-6">Chi tiết đơn hàng #{order.id}</h2>

            <div className="mb-4">
                <p><strong>Thời gian đặt:</strong> {new Date(order.orderdate).toLocaleString()}</p>
                <p><strong>Số bàn:</strong> {order.tablenumber}</p>
                <p><strong>Số khách:</strong> {order.numberguest}</p>
                <p><strong>Tổng tiền:</strong> {order.Total.toLocaleString()} đ</p>
                <p><strong>Trạng thái:</strong> {order.status}</p>
                <p><strong>Chế độ:</strong> {order.mode}</p>
            </div>
            <div className="mb-4">
                <button
                    className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
                    onClick={() => {
                        setShowModal(true);
                        setSelectedMode(null)
                    }}
                >
                    Cập nhật chế độ
                </button>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Chi tiết sản phẩm</h3>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID Sản phẩm</th>
                        <th className="py-2 px-4 border-b">Tên sản phẩm</th>
                        <th className="py-2 px-4 border-b">Thời gian đặt</th>
                        <th className="py-2 px-4 border-b">Số lượng</th>
                        <th className="py-2 px-4 border-b">Giá</th>
                        <th className="py-2 px-4 border-b">Trạng thái</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {order.orderDetails.map((detail) => (
                        <tr key={detail.productID}>
                            <td className="py-2 px-4 border-b text-center">{detail.productID}</td>
                            <td className="py-2 px-4 border-b">{detail.productName}</td>
                            <td className="py-2 px-4 border-b text-center">{new Date(detail.orderTime).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b text-center">{detail.quantity}</td>
                            <td className="py-2 px-4 border-b text-right">{detail.price.toLocaleString()} đ</td>
                            <td className="py-2 px-4 border-b text-center">{detail.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <p className="mb-4">Vui lòng chọn chế độ:</p>
                        <div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleUpdateMode('Thường')}>Thường</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleUpdateMode('Buffet')}>Buffet</button>
                        </div>
                    </div>
                </div>
            )}
            <CreateOrderDetail />

            <ToastContainer />
        </div>
    );
};

export default OrderDetail;
