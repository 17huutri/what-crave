import axiosClient from "./axiosClient";

const newsApi = {
    getAllNews() {
        const url = "/News/GetAllNews";
        return axiosClient.get(url);
    },
    getNewsById(id) {
        const url = `/News/GetNewsById/${id}`;
        return axiosClient.get(url);
    },
    createNews(data) {
        const url = '/News/CreateNews';
        return axiosClient.post(url,data);
    }
};

export default newsApi;
