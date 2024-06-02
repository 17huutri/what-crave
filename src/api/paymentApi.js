import axios from 'axios';

const API_URL = 'https://themgico_node.nguyenminhhai.us/api';

export const createPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${API_URL}/payment`, paymentData);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Something went wrong';
    }
};

export const payPayment = async (paymentID, paymentMethod) => {
    try {
        const response = await axios.put(`${API_URL}/payment/${paymentID}`, { paymentMethod });
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Something went wrong';
    }
};

export const cancelPayment = async (paymentID) => {
    try {
        const response = await axios.post(`${API_URL}/payment/${paymentID}`);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Something went wrong';
    }
};

export const getListPayment = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/payment?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Something went wrong';
    }
};
