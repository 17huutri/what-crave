import axiosClient from "./axiosClient";

const dishApi = {
    getCatalog() {
        const url = "/Product/GetAllProduct";
        return axiosClient.get(url);
    },


};

export default dishApi;
