import axiosClient from "./axiosClient";

const categoryApi = {
    getAllCategories() {
        const url = "/Category/GetAllCategories";
        return axiosClient.get(url);
    },

};

export default categoryApi;
