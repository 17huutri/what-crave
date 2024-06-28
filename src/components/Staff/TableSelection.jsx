import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { ToastContainer, toast } from "react-toastify";
import { FaSearch, FaTable } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { PacmanLoader } from 'react-spinners';

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
        return (
            <div className="flex justify-center mt-48 ml-32">
                <PacmanLoader color='#728FCE' size={70} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center mt-48 ml-32">
                <PacmanLoader color='#728FCE' size={70} />
            </div>
        );
    }

    return (
        <div className="p-6 py-20">
            <div className="flex space-x-4 mb-6">
                <div>
                    <label htmlFor="filterTableNumber" className="block text-sm font-medium text-gray-700">Bàn số:</label>
                    <input
                        type="number"
                        id="filterTableNumber"
                        placeholder="Số bàn"
                        name="filterTableNumber"
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-24"
                        min="1"
                    />
                </div>
                <div>
                    <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700">Trạng thái:</label>
                    <select
                        id="filterStatus"
                        name="filterStatus"
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Tất cả</option>
                        <option value="In Service">Đang phục vụ</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="Done">Đã hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                        <option value="available">Có sẵn</option>
                    </select>
                </div>
                <button
                    type="button"
                    onClick={handleSearch}
                    className="inline-flex items-center justify-center px-2 py-1 text-sm font-medium rounded-md shadow-sm bg-white "
                >
                    <FaSearch className="h-4 w-4" />
                </button>

            </div>

            <div className="grid grid-cols-4 gap-6">
                {filteredTables.map((table) => (
                    <div
                        key={table.tablenumber}
                        className={`p-6 text-center rounded-lg cursor-pointer border border-gray-300 shadow-sm hover:shadow-md ${getStatusClass(table.status)}`}
                        onClick={() => handleTableClick(table.tablenumber, table.status)}
                    >
                        <FaTable className={`h-16 w-16 mx-auto ${getStatusClass(table.status)}`} />
                        <div className="mt-4 text-lg font-semibold">Bàn {table.tablenumber}</div>
                    </div>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
};

export default TableSelection;
