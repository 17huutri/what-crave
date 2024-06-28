import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { ToastContainer, toast } from "react-toastify";
import { FaSearch, FaTable } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const getStatusClass = (status) => {
    switch (status) {
        case 'In Service':
            return 'text-red-500';
        case 'processing':
            return 'text-yellow-500';
        case 'Done':
            return 'text-green-500';
        case 'cancelled':
            return 'text-gray-500';
        case 'available':
            return 'text-blue-500';
        default:
            return 'text-gray-500';
    }
};

const filterTables = (tables, filters) => {
    let filteredTables = tables;

    if (filters.filterTableNumber) {
        filteredTables = filteredTables.filter(table => table.tablenumber === parseInt(filters.filterTableNumber));
    }

    if (filters.filterStatus) {
        filteredTables = filteredTables.filter(table => table.status === filters.filterStatus);
    }

    return filteredTables;
};

const TableSelection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, isLoading, error } = useSelector((state) => state.orders);
    const [filters, setFilters] = useState({ filterTableNumber: '', filterStatus: '' });

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleTableClick = (tableNumber, status) => {
        if (status === 'available') {
            navigate('/staff/orders');
        } else {
            navigate(`/staff/order/${tableNumber}`);
        }
    };

    const handleSearch = () => {
        setFilters({
            filterTableNumber: document.getElementById('filterTableNumber').value,
            filterStatus: document.getElementById('filterStatus').value
        });
    };

    const allTables = Array.from({ length: 20 }, (_, i) => i + 1);
    const tableStatuses = orders.reduce((acc, order) => {
        acc[order.tablenumber] = order.status;
        return acc;
    }, {});

    const tables = allTables.map(tableNumber => ({
        tablenumber: tableNumber,
        status: tableStatuses[tableNumber] || 'available'
    }));

    const filteredTables = filterTables(tables, filters);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <div className="flex space-x-4 mb-4">
                <div>
                    <label htmlFor="filterTableNumber" className="block text-sm font-medium">Bàn số:</label>
                    <input type="number" id="filterTableNumber" placeholder="Số bàn" name="filterTableNumber" className="input-field px-4 w-24" min="1" />
                </div>
                <div>
                    <label htmlFor="filterStatus" className="block text-sm font-medium">Trạng thái:</label>
                    <select id="filterStatus" name="filterStatus" className="input-field px-4">
                        <option value="">Tất cả</option>
                        <option value="In Service">Đang phục vụ</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="Done">Đã hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                        <option value="available">Có sẵn</option>
                    </select>
                </div>
                <button type="button" onClick={handleSearch} className="text-black">
                    <FaSearch />
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4 p-10">
                {filteredTables.map((table) => (
                    <div
                        key={table.tablenumber}
                        className={`p-10 text-center rounded cursor-pointer border border-gray-300 ${getStatusClass(table.status)}`}
                        onClick={() => handleTableClick(table.tablenumber, table.status)}
                    >
                        <FaTable className={`h-16 w-16 mx-auto ${getStatusClass(table.status)}`} />
                        <div className="mt-2 text-lg">Bàn {table.tablenumber}</div>
                    </div>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
};

export default TableSelection;
