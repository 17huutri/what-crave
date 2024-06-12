import axiosClient from "./axiosClient";

const userApi = {
    getAllUsers() {
        const url = "/User/get-all";
        return axiosClient.get(url);
    },

    updateStatus(id, params) {
        const url = `/User/update-status/${id}`;
        return axiosClient.put(url, params);
    },
};

export default userApi;
