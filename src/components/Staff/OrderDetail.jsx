import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderById, updateMode } from '../../store/slices/orderSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateOrderDetail from './CreateOrderDetail';
import { PacmanLoader } from 'react-spinners';

const getStatusText = (status) => {
    switch (status) {
        case 'In Service':
            return <span className="text-purple-500 font-semibold">Đang phục vụ</span>;
        case 'processing':
            return <span className="text-blue-500 font-semibold">Đang xử lý</span>;
        case 'Preparing':
            return <span className="text-yellow-500 font-semibold">Đang chuẩn bị</span>;
        case 'Done':
            return <span className="text-green-500 font-semibold">Đã hoàn thành</span>;
        case 'cancelled':
            return <span className="text-red-500 font-semibold">Đã hủy</span>;
        default:
            return status;
    }
};

const OrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order, isLoading, error } = useSelector((state) => state.orders);
    const [showModal, setShowModal] = useState(false);
    const [selectedMode, setSelectedMode] = useState(null);

    useEffect(() => {
        dispatch(fetchOrderById(id));
    }, [dispatch, id]);

    useEffect(() => {
        console.log('Order updated:', order);
    }, [order]);

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
        return (
            <div className="flex justify-center mt-40">
                <PacmanLoader color='#728FCE' size={70} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center mt-40">
                <p className="text-red-500">{error.message}</p>
            </div>
        );
    }

    const handleDetailCreated = () => {
        dispatch(fetchOrderById(id));
    };

    return (
        <div className="mt-8 py-8 px-4 md:py-12 md:px-6 font-beVn">
            <h2 className="text-3xl font-semibold mb-6">Chi tiết đơn hàng #{order.id}</h2>
            <div className="mx-40 list-disc list-inside space-y-4">
                <div className="flex justify-between">
                    <p className="font-semibold">Thời gian đặt:</p>
                    <p>{order.orderdate ? new Date(order.orderdate).toLocaleString() : 'N/A'}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-semibold">Số bàn:</p>
                    <p>{order.tablenumber ?? 'N/A'}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-semibold">Số khách:</p>
                    <p>{order.numberguest ?? 'N/A'}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-semibold">Tổng tiền:</p>
                    <p>{order.Total ? order.Total.toLocaleString() : '0'} đ</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-semibold">Trạng thái:</p>
                    <p>{getStatusText(order.status) ?? ''}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-semibold">Chế độ:</p>
                    <p>{order.mode ?? ''}</p>
                </div>
            </div>
            <div className="py-4">
                {
                    order.status !== 'Done' && order.mode !== 'Buffet' && (
                        <button
                            className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
                            onClick={() => setShowModal(true)}
                        >
                            Cập nhật chế độ
                        </button>
                    )
                }
                {order.status !== 'Done' && (
                    <button
                        className="text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded ml-4"
                        onClick={() => navigate('/staff/payment', { state: { orderID: id } })}
                    >
                        Tạo thanh toán
                    </button>
                )}
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
                        detail ? (
                            <tr key={detail.productID}>
                                <td className="py-2 px-4 border-b">{detail.productID}</td>
                                <td className="py-2 px-4 border-b">{detail.productName}</td>
                                <td className="py-2 px-4 border-b text-center">{new Date(detail.orderTime).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b text-center">{detail.quantity}</td>
                                <td className="py-2 px-4 border-b text-right">{detail.price.toLocaleString()} đ</td>
                                <td className="py-2 px-4 border-b text-center"> {getStatusText(detail.status)}</td>

                            </tr>
                        ) : null
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
            {order?.status !== 'Done' && <CreateOrderDetail onDetailCreated={handleDetailCreated} />}
            <ToastContainer />
        </div>
    );
};

export default OrderDetail;
