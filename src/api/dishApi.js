import axiosClient from "./axiosClient";

const dishApi = {
    getCatalog() {
        const url = "/Product/GetAllProduct";
        return axiosClient.get(url);
    },

    createProduct(data) {
        const url = "/Product/CreateProduct";
        return axiosClient.post(url, data);
    },
    updateProduct(data) {
        const url = `/Product/UpdateProduct`;
        return axiosClient.put(url, data);
    },

    deleteProduct(id) {
        const url = `/Product/DeleteProduct/${id}`;
        return axiosClient.delete(url);
    },

    updateProductStatus(id, status) {
        const url = `/Product/updatestatus/${id}`;
        return axiosClient.put(url, { status });
    }
};

export default dishApi;
