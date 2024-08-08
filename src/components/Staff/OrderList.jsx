import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, setCurrentPage } from '../../store/slices/orderSlice';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import orderAPI from '../../api/orderApi';
import { ToastContainer, toast } from "react-toastify";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PaginationNav1 from '../PaginationNav1';
import { FaSearch } from 'react-icons/fa';

const filterOrders = (orders, filters) => {
    let filteredOrders = orders;

    if (filters.filterTable) {
        filteredOrders = filteredOrders.filter(order => order.tablenumber === parseInt(filters.filterTable));
    }

    if (filters.filterMode) {
        filteredOrders = filteredOrders.filter(order => order.mode === filters.filterMode);
    }

    if (filters.filterStatus) {
        filteredOrders = filteredOrders.filter(order => order.status === filters.filterStatus);
    }

    return filteredOrders;
};

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, currentPage, totalPages, isLoading, error } = useSelector((state) => state.orders);
    const { register, handleSubmit, reset, formState: { errors }, getValues, watch } = useForm();
    const [filters, setFilters] = useState({ filterTable: '', filterMode: '', filterStatus: '' });

    useEffect(() => {
        dispatch(fetchOrders(currentPage));
    }, [dispatch, currentPage]);

    const onSubmit = async (data) => {
        try {
            await orderAPI.initOrder(data);
            reset();
            dispatch(fetchOrders(currentPage));
            toast.success('Đặt món thành công!');
        } catch (error) {
            console.error("Error submitting order:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Đã xảy ra lỗi!');
            }
        }
    };

    const handleSearch = () => {
        setFilters({
            filterTable: getValues('filterTable'),
            filterMode: getValues('filterMode'),
            filterStatus: getValues('filterStatus')
        });
    };

    const filteredOrders = filterOrders(orders, filters);

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                        Đặt thêm món
                    </h3>
                    <div className="mb-4">
                        <div>
                            <label htmlFor="tablenumber" className="block text-sm font-medium text-gray-700 mb-1">Số bàn:</label>
                            <input
                                type="number"
                                {...register('tablenumber', { required: 'Số bàn là bắt buộc' })}
                                id="tablenumber"
                                placeholder="Số bàn"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm max-w-[120px]"
                                min="1"
                                max="99"
                                maxLength="2"
                            />
                            {errors.tablenumber && <p className="mt-1 text-xs text-red-600">{errors.tablenumber.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="numberguest" className="block text-sm font-medium text-gray-700 mb-1">Số khách:</label>
                            <input
                                type="number"
                                {...register('numberguest', { required: 'Số khách là bắt buộc' })}
                                id="numberguest"
                                placeholder="Số khách"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm max-w-[120px]"
                                min="1"
                                max="99"
                                maxLength="2"
                            />
                            {errors.numberguest && <p className="mt-1 text-xs text-red-600">{errors.numberguest.message}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Loại đặt món:</label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    {...register('mode', { required: 'Vui lòng chọn loại đặt món' })}
                                    value="Thường"
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-sm text-gray-700">Thường</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    {...register('mode', { required: 'Vui lòng chọn loại đặt món' })}
                                    value="Buffet"
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-sm text-gray-700">Buffet</span>
                            </label>
                        </div>
                        {errors.mode && <p className="mt-1 text-xs text-red-600">{errors.mode.message}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-sm"
                        >
                            Đặt món
                        </button>
                    </div>
                </form>


                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {isLoading ? <Skeleton height={30} width={300} /> : "Danh sách đặt món"}
                        </h2>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex-1 min-w-[200px]">
                                <label htmlFor="filterTable" className="block text-sm font-medium text-gray-700 mb-1">Bàn số:</label>
                                <input
                                    type="number"
                                    {...register('filterTable')}
                                    id="filterTable"
                                    placeholder="Số bàn"
                                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    min="1"

                                />
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <label htmlFor="filterMode" className="block text-sm font-medium text-gray-700 mb-1">Chế độ:</label>
                                <select
                                    {...register('filterMode')}
                                    id="filterMode"
                                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                >
                                    <option value="">Tất cả</option>
                                    <option value="Thường">Thường</option>
                                    <option value="Buffet">Buffet</option>
                                </select>
                            </div>

                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSearch}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center text-sm"
                            >
                                <FaSearch className="mr-2" />
                                Tìm kiếm
                            </button>
                        </div>
                    </div>


                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID Đơn hàng</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Thời gian đặt</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Số bàn</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Số khách</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tổng tiền</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Chế độ</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoading
                                    ? [...Array(5)].map((_, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap"><Skeleton height={20} width={100} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap"><Skeleton height={20} width={150} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap"><Skeleton height={20} width={100} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap"><Skeleton height={20} width={100} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap"><Skeleton height={20} width={100} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap"><Skeleton height={20} width={100} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap"><Skeleton height={20} width={100} /></td>
                                        </tr>
                                    ))
                                    : filteredOrders.map((order) => {
                                        const modeClass = order.mode === 'Buffet' ? 'bg-yellow-100' : 'bg-white-100';

                                        return (
                                            <tr key={order.idOrder} className={`hover:bg-gray-50 ${modeClass}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.idOrder}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(order.orderdate).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.tablenumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.numberguest}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.Total.toLocaleString()} đ</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.mode}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link to={`/staff/order/${order.idOrder}`} className="text-blue-600 hover:text-blue-900">Xem</Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
                        <PaginationNav1
                            gotoPage={(page) => dispatch(setCurrentPage(page + 1))}
                            canPreviousPage={currentPage > 1}
                            canNextPage={currentPage < totalPages}
                            pageCount={totalPages}
                            pageIndex={currentPage - 1}
                        />
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OrderList;