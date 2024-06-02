
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createPaymentAsync } from '../../store/slices/paymentSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { name, orderID, phone = null } = data;
        dispatch(createPaymentAsync({ name, orderID, phone }))
            .then((res) => {
                toast.success('Tạo thanh toán thành công');
                reset()
                if (res.meta.requestStatus === 'fulfilled') {

                } else {
                    toast.error('Tạo thanh toán thất bại');
                }
            })
            .catch((err) => {
                toast.error('Tạo thanh toán thất bại');
                console.error(err);
            });
    };

    return (
        <div className="container mx-auto px-4 mt-20 text-center">
            <h2 className='text-2xl lg:text-3xl leading-snug font-bold mb-5'>Tạo thanh toán mới</h2>
            <form onSubmit={handleSubmit(onSubmit)} className=" ">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-bold mb-2">
                        Tên khách hàng
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="border border-gray-400 p-2 "
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-500">Tên khách hàng là bắt buộc</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block font-bold mb-2">
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        id="phone"
                        className="border border-gray-400 p-2 "
                        {...register('phone')}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="orderID" className="block font-bold mb-2">
                        Mã đơn hàng
                    </label>
                    <input
                        type="text"
                        id="orderID"
                        className="border border-gray-400 p-2 "
                        {...register('orderID', { required: true })}
                    />
                    {errors.orderID && <span className="text-red-500">Mã đơn hàng là bắt buộc</span>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Tạo thanh toán
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Payment;