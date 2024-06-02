import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, setCurrentPage } from '../../store/slices/orderSlice';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import orderAPI from '../../api/orderApi';
import { ToastContainer, toast } from "react-toastify";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PaginationNav1 from '../PaginationNav1';


const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, currentPage, totalPages, isLoading, error } = useSelector((state) => state.orders);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        dispatch(fetchOrders(currentPage));
    }, [dispatch, currentPage]);

    const onSubmit = async (data) => {
        try {
            await orderAPI.initOrder(data);
            reset();
            dispatch(fetchOrders(currentPage));
        } catch (error) {
            console.error("Error submitting order:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Đã xảy ra lỗi!');
            }
        }
    };

    return (
        <>
            <div className="mt-8 py-8 px-4 md:py-12 md:px-6">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center border border-gray-300 rounded p-6 max-w-sm mx-auto space-y-4 bg-yellow-100">
                    <h3 className="text-xl font-semibold">
                        Đặt thêm món
                    </h3>
                    <div >
                        <label htmlFor="tablenumber" className="block text-sm font-medium">Số bàn:</label>
                        <input type="number" {...register('tablenumber', { required: 'Số bàn là bắt buộc' })} id="tablenumber" placeholder="Số bàn" name="tablenumber" className="input-field px-4 " min="1" />
                        {errors.tablenumber && <p className="text-red-500">{errors.tablenumber.message}</p>}
                    </div>
                    <div >
                        <label htmlFor="numberguest" className="block text-sm font-medium">Số khách:</label>
                        <input type="number" {...register('numberguest', { required: 'Số khách là bắt buộc' })} id="numberguest" placeholder="Số khách" name="numberguest" className="input-field px-4" min="1" />
                        {errors.numberguest && <p className="text-red-500">{errors.numberguest.message}</p>}
                    </div>
                    <div >
                        <div className="flex items-center space-x-4">
                            <input type="radio" id="regular" {...register('mode', { required: 'Vui lòng chọn loại đặt món' })} value="normal" name="mode" className="mr-2" />
                            <label htmlFor="regular">Thường</label>
                            <input type="radio" id="buffet" {...register('mode', { required: 'Vui lòng chọn loại đặt món' })} value="buffet" name="mode" className="mr-2" />
                            <label htmlFor="buffet">Buffet</label>
                        </div>
                        {errors.mode && <p className="text-red-500">{errors.mode.message}</p>}
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Đặt món
                    </button>
                </form>




                <h2 className="text-3xl font-semibold mb-6">
                    {isLoading ? <Skeleton height={30} width={300} /> : "Danh sách đặt món"}
                </h2>
                <table className="min-w-full bg-neutral-100 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">
                                {isLoading ? <Skeleton height={20} width={100} /> : "ID Đơn hàng"}
                            </th>
                            <th className="py-2 px-4 border-b">
                                {isLoading ? <Skeleton height={20} width={150} /> : "Thời gian đặt"}
                            </th>
                            <th className="py-2 px-4 border-b">
                                {isLoading ? <Skeleton height={20} width={100} /> : "Số bàn"}
                            </th>
                            <th className="py-2 px-4 border-b">
                                {isLoading ? <Skeleton height={20} width={100} /> : "Số khách"}
                            </th>
                            <th className="py-2 px-4 border-b">
                                {isLoading ? <Skeleton height={20} width={100} /> : "Tổng tiền"}
                            </th>
                            <th className="py-2 px-4 border-b">
                                {isLoading ? <Skeleton height={20} width={100} /> : "Chế độ"}
                            </th>
                            <th className="py-2 px-4 border-b">
                                {isLoading ? <Skeleton height={20} width={100} /> : "Trạng thái"}
                            </th>
                            <th className="py-2 px-4 border-b">
                                {isLoading ? <Skeleton height={20} width={100} /> : "Chi tiết"}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            [...Array(5)].map((_, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Skeleton height={20} width={100} />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Skeleton height={20} width={150} />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Skeleton height={20} width={100} />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Skeleton height={20} width={100} />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Skeleton height={20} width={100} />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Skeleton height={20} width={100} />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Skeleton height={20} width={100} />
                                    </td>
                                </tr>
                            ))
                            :
                            orders.map((order) => (
                                <tr key={order.idOrder}>
                                    <td className="py-2 px-4 border-b text-center">{order.idOrder}</td>
                                    <td className="py-2 px-4 border-b text-center">{new Date(order.orderdate).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</td>
                                    <td className="py-2 px-4 border-b text-center">{order.tablenumber}</td>
                                    <td className="py-2 px-4 border-b text-center">{order.numberguest}</td>
                                    <td className="py-2 px-4 border-b text-center">{order.Total.toLocaleString()} đ</td>
                                    <td className="py-2 px-4 border-b text-center">{order.mode}</td>
                                    <td className="py-2 px-4 border-b text-center">{order.status}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <Link to={`/staff/order/${order.idOrder}`} className="text-blue-500 hover:underline">Xem</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center">

                    <PaginationNav1
                        gotoPage={(page) => dispatch(setCurrentPage(page + 1))}
                        canPreviousPage={currentPage > 1}
                        canNextPage={currentPage < totalPages}
                        pageCount={totalPages}
                        pageIndex={currentPage - 1}
                    />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default OrderList;

