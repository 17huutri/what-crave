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
        switch (status) {
            case 'QR':
                return <Tag color="pink" style={{ fontWeight: 'bold' }}>QR</Tag>;
            case 'Tiền mặt':
                return <Tag color="green" style={{ fontWeight: 'bold' }}>Tiền mặt</Tag>;
            case 'None':
                return <Tag color="grey" style={{ fontWeight: 'bold' }}>Chưa thanh toán</Tag>;
            default:
                return <Tag color="blue" style={{ fontWeight: 'bold' }}>Không rõ</Tag>;
        }
    };


    const renderStatus = (status) => {
        switch (status) {
            case '0':
                return <Tag color="red" style={{ fontWeight: 'bold' }}>Chưa thanh toán</Tag>;
            case '1':
                return <Tag color="green" style={{ fontWeight: 'bold' }}>Đã thanh toán</Tag>;
            case '2':
                return <Tag color="grey" style={{ fontWeight: 'bold' }}>Đã bị hủy</Tag>;
            default:
                return <Tag color="blue" style={{ fontWeight: 'bold' }}>Không rõ</Tag>;
        }
    };

    const columns = [
        {
            title: 'Mã thanh toán',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Số tiền',
            dataIndex: 'Amount',
            key: 'amount',
            render: (amount) => (
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}</span>
            ),
        },
        {
            title: 'Ngày thanh toán',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            render: (paymentDate) => moment(paymentDate).format('DD/MM/YYYY, HH:mm:ss'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: renderPaymentMethod,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: renderStatus,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                record.status === '0' && (
                    <Button onClick={() => handlePay(record.id)}>Thanh toán bằng tiền mặt</Button>
                )
            ),
        },
    ];

    return (
        <div className="container mx-auto p-4 py-36">
            <h1 className="text-2xl font-bold mb-4">Lịch sử giao dịch</h1>
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
                />
            )}
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
};

export default PurchaseHistory;
