import axiosClient from "./axiosClient";

const dishApi = {
    getCatalog() {
        const url = "/Product/GetAll";
        return axiosClient.get(url);
    },


};

export default dishApi;
