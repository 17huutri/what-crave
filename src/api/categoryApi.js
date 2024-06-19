import axiosClient from "./axiosClient";

const categoryApi = {
    getAllCategories() {
        const url = "/Category/GetAllCategories";
        return axiosClient.get(url);
    },


    createCategory(categoryData) {
        const url = "/Category/CreateCategory";
        return axiosClient.post(url, categoryData);
    },

    deleteCategory(id) {
        const url = `/Category/DeleteCategory/${id}`;
        return axiosClient.delete(url);
    },

    updateCategory(data) {
        const url = `/Category/UpdateCategory`;
        return axiosClient.put(url, data);
    },


};

export default categoryApi;
