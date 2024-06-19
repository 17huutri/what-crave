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
        return axiosClient.post(url, data);
    },
    deleteNews(id) {
        const url = `/News/DeleteNews/${id}`;
        return axiosClient.delete(url);
    },

    updateNews(data) {
        const url = `/News/UpdateNews`;
        return axiosClient.put(url, data);
    },


};

export default newsApi;
