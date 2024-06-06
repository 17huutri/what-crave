import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListPaymentAsync } from '../../store/slices/paymentSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import PaginationNav1 from '../PaginationNav1';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const PaymentList = () => {
    const dispatch = useDispatch();
    const { payment, loading, error } = useSelector((state) => state.payment);
    const { currentPage, totalPages, listPayments } = payment;

    useEffect(() => {
        dispatch(getListPaymentAsync({ currentPage }));
    }, [dispatch, currentPage]);

    const handlePageChange = (pageIndex) => {
        dispatch(getListPaymentAsync({ currentPage: pageIndex + 1 }));
    };

    return (
        <div className="container mx-auto px-4 py-8 text-center mt-40">
            {error && <p className="text-red-500">Error: {error}</p>}
            {listPayments && (
                <>
                    <h2 className='text-2xl lg:text-3xl leading-snug font-bold mb-5'>Danh sách thanh toán</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Order ID</th>
                                <th className="border border-gray-300 p-2">Ngày thanh toán</th>
                                <th className="border border-gray-300 p-2">Chi phí</th>
                                <th className="border border-gray-300 p-2">SDT</th>
                                <th className="border border-gray-300 p-2">Phương thức thanh toán</th>
                                <th className="border border-gray-300 p-2">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listPayments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="border border-gray-300 p-2">{payment.id}</td>
                                    <td className="border border-gray-300 p-2">{payment.orderID}</td>
                                    <td className="border border-gray-300 p-2">
                                        {payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleDateString()
                                            : '-'}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {payment.Amount ? formatCurrency(payment.Amount) : '-'}
                                    </td>
                                    <td className="border border-gray-300 p-2">{payment.phone || '-'}</td>
                                    <td className="border border-gray-300 p-2">{payment.paymentMethod || '-'}</td>
                                    <td className="border border-gray-300 p-2">
                                        {payment.status || '-'}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-center">
                        <PaginationNav1
                            gotoPage={handlePageChange}
                            canPreviousPage={currentPage > 1}
                            canNextPage={currentPage < totalPages}
                            pageCount={totalPages}
                            pageIndex={currentPage - 1}
                        />
                    </div>
                </>
            )}
            <ToastContainer />
        </div>
    );
};

export default PaymentList;