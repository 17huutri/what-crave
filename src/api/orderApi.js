import axios from 'axios';

const baseUrl = 'https://themgico_node.nguyenminhhai.us/api/order';



const initOrder = async ({ tablenumber, mode, numberguest }) => {
    try {
        const response = await axios.post(baseUrl, {
            tablenumber,
            mode,
            numberguest,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getOrderById = async (orderID) => {
    try {
        const response = await axios.get(`${baseUrl}/${orderID}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
const updateMode = async (orderID, newMode) => {
    try {
        const response = await axios.put(`${baseUrl}/${orderID}`, { mode: newMode });
        return response.data;
    } catch (error) {
        throw error;
    }
};
const updateOrder = async (orderID, data) => {
    try {
        const response = await axios.put(`${baseUrl}/updateOrder/${orderID}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { initOrder, getOrderById, updateOrder, updateMode };
