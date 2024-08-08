import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Spin, message, Tag } from 'antd';
import { getListPaymentAsync, payPaymentAsync } from '../../store/slices/paymentSlice';
import moment from 'moment';

const PurchaseHistory = () => {
    const dispatch = useDispatch();
    const { payment, loading, error } = useSelector(state => state.payment);
    const [pageSize, setPageSize] = useState(5);
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        dispatch(getListPaymentAsync({ currentPage: 1, perPage: pageSize }));
    }, [dispatch, pageSize, forceUpdate]);

    const handlePay = async (paymentID) => {
        try {
            await dispatch(payPaymentAsync({ paymentID, paymentMethod: 'Tiền mặt' })).unwrap();
            message.success('Thanh toán thành công');
            setForceUpdate(prev => !prev);
        } catch (err) {
            message.error('Thanh toán thất bại');
        }
    };

    const renderPaymentMethod = (status) => {
        const colors = {
            'QR': 'pink',
            'Banking': 'green',
            'Tiền mặt': 'blue',
            'None': 'grey',
        };
        return <Tag color={colors[status] || 'yellow'} className="font-bold">{status || 'Không rõ'}</Tag>;
    };

    const renderStatus = (status) => {
        const colors = {
            '0': 'red',
            '1': 'green',
            '2': 'grey',
        };
        const texts = {
            '0': 'Chưa thanh toán',
            '1': 'Đã thanh toán',
            '2': 'Đã bị hủy',
        };
        return <Tag color={colors[status] || 'blue'} className="font-bold">{texts[status] || 'Không rõ'}</Tag>;
    };

    const columns = [
        {
            title: <span className="font-bold">Mã thanh toán</span>,
            dataIndex: 'id',
            key: 'id',
            render: (id) => <span className="font-semibold">{id + 1000}</span>,
        },
        {
            title: <span className="font-bold">Số tiền</span>,
            dataIndex: 'Amount',
            key: 'amount',
            render: (amount) => (
                <span className="font-semibold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}</span>
            ),
        },
        {
            title: <span className="font-bold">Ngày thanh toán</span>,
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            render: (paymentDate) => <span className="font-semibold">{moment(paymentDate).format('DD/MM/YYYY, HH:mm:ss')}</span>,
        },
        {
            title: <span className="font-bold">Số điện thoại</span>,
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <span className="font-semibold">{text}</span>,
        },
        {
            title: <span className="font-bold">Phương thức thanh toán</span>,
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: renderPaymentMethod,
        },
        {
            title: <span className="font-bold">Trạng thái</span>,
            dataIndex: 'status',
            key: 'status',
            render: renderStatus,
        },
        {
            title: <span className="font-bold">Hành động</span>,
            key: 'action',
            render: (text, record) => (
                record.status === '0' && (
                    <Button
                        type="primary"
                        onClick={() => handlePay(record.id)}
                    >
                        Thanh toán bằng tiền mặt
                    </Button>
                )
            ),
        },
    ];

    return (
        <div className="container mx-auto p-6 py-20 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lịch sử giao dịch</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={payment.listPayments}
                    rowKey="id"
                    pagination={{
                        position: ["bottomCenter"],
                        current: payment.currentPage,
                        total: payment.totalPages * pageSize,
                        pageSize: pageSize,
                        onChange: (page, newPageSize) => {
                            if (newPageSize !== pageSize) {
                                setPageSize(newPageSize);
                            }
                            dispatch(getListPaymentAsync({ currentPage: page, perPage: newPageSize }));
                        },
                    }}
                    bordered
                />
            )}
            {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        </div>
    );
};

export default PurchaseHistory;
