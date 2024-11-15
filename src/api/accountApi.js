import axiosClient from "./axiosClient";

const accountApi = {
  login(params) {
    const url = "/User/login";
    return axiosClient.post(url, params);
  },

  changePassword(params) {
    const url = "/User/change-password";
    return axiosClient.post(url, params);
  },
  createAccountStaff(params) {
    const url = "/User/create-account-staff";
    return axiosClient.post(url, params);
  },
};




export default accountApi;
