import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createPaymentAsync } from '../../store/slices/paymentSlice';
import QRCode from 'qrcode.react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [paymentItems, setPaymentItems] = useState(null);

    const orderId = location.state?.orderID;

    const onSubmit = (data) => {
        setShowModal(true);
        setPaymentInfo(data);
    };

    const confirmPayment = () => {
        const { name, orderID, phone = null } = paymentInfo;
        dispatch(createPaymentAsync({ name, orderID, phone }))
            .then((res) => {
                setShowModal(false);
                reset();
                if (res.meta.requestStatus === 'fulfilled') {
                    setPaymentInfo(res.payload.paymentInformation);
                    setPaymentItems(res.payload.item);
                    toast.success('Tạo thanh toán thành công');
                } else {
                    toast.error('Tạo thanh toán thất bại');
                }
            })
            .catch((err) => {
                setShowModal(false);
                toast.error('Tạo thanh toán thất bại');
                console.error(err);
            });
    };

    const handleCancelPayment = () => {
        setShowModal(false);
        setPaymentInfo(null);
        setPaymentItems(null);
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="container mx-auto px-4 mt-40 text-center">
            <ToastContainer />
            <div className="lg:flex lg:justify-between">
                <div className="lg:w-1/2">
                    <h2 className='text-2xl lg:text-3xl leading-snug font-bold mb-5'>Tạo thanh toán mới</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 underline">
                                Tên khách hàng
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-400'} rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                {...register('name', { required: true })}
                            />
                            {errors.name && <p className="text-red-500 text-xs italic">Tên khách hàng là bắt buộc</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2 underline">
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="shadow appearance-none border border-gray-400 rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register('phone')}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="orderID" className="block text-gray-700 text-sm font-bold mb-2 underline">
                                Mã đơn hàng
                            </label>
                            <input
                                type="text"
                                id="orderID"
                                defaultValue={orderId}
                                className={`shadow appearance-none border ${errors.orderID ? 'border-red-500' : 'border-gray-400'} rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                {...register('orderID', { required: true })}
                            />
                            {errors.orderID && <p className="text-red-500 text-xs italic">Mã đơn hàng là bắt buộc</p>}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Tạo thanh toán
                        </button>
                    </form>
                </div>

                {paymentInfo && !showModal && (
                    <div className="lg:w-1/2 mt-10 lg:mt-0 lg:ml-4">
                        <h3 className="text-xl font-bold">Thông tin thanh toán</h3>
                        <p className='text-main_color_2 underline'>
                            <a href={paymentInfo.checkoutUrl} target="_blank" rel="noopener noreferrer" className="underline">{paymentInfo.checkoutUrl}</a>
                        </p>
                        <div className="flex justify-center mt-6">
                            <QRCode value={paymentInfo.qrCode} />
                        </div>
                        <div className='mb-20'>
                            <h4 className="text-lg font-bold mt-4">Danh sách sản phẩm</h4>
                            <ul className="list-disc list-inside">
                                {paymentItems.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span className="text-right">{item.price.toLocaleString('vi-VN')} VND</span>
                                    </li>
                                ))}
                                {paymentItems && (
                                    <li className="flex justify-between border-t border-gray-400 pt-2">
                                        <span className="font-bold">Tổng tiền:</span>
                                        <span className="font-bold">{calculateTotal(paymentItems).toLocaleString('vi-VN')} VND</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Xác nhận thanh toán</h2>
                        <p>Bạn có chắc chắn muốn tạo thanh toán?</p>
                        <div className="mt-4">
                            <button
                                onClick={confirmPayment}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                            >
                                Xác nhận
                            </button>
                            <button
                                onClick={handleCancelPayment}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Hủy bỏ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
