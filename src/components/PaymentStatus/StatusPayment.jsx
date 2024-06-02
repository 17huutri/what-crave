import React, { useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import storageService from "../../api/storageService";
import { setIsLogin, setRole } from "../../store/slices/accountSlice";
import { ROLE } from "../../api/constant_api";
import { jwtDecode } from "jwt-decode";

export default function StatusPayment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const id = queryParams.get("id");
  const dispatch = useDispatch();

  useEffect(() => {
    let token = storageService.getAccessToken();
    if (token) {
      token = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > token.expire) {
        storageService.setAccessToken("");
        dispatch(setIsLogin(false));
        storageService.removeRole();
        dispatch(setRole(""));
      } else {
        dispatch(setIsLogin(true));
        dispatch(setRole(token[ROLE]));
        storageService.setRole(token[ROLE]);
      }
    }
  }, []);

  useEffect(() => {
  }, [status]);

  return (
    <div className="flex justify-center items-center h-screen bg-main_color_3">
      <div className="bg-white rounded-[10px] w-[32%] h-[32%] items-center flex flex-col space-y-1">
        <div className="py-5">
          {status === "success" ? (
            <BsCheckCircleFill
              style={{ color: "#23d747", fontSize: "60px" }}
            />
          ) : (
            <AiOutlineCloseCircle style={{ color: "red", fontSize: "60px" }} />
          )}
        </div>
        <div className="font-bold pb-2 text-[20px]">
          Thanh toán {status === "success" ? "thành công" : "không thành công"}{" "}
        </div>
        <div className="flex">
          <div className="">Mã số đơn hàng của bạn là</div>
          <div className="text-green-500 font-bold pl-1">{id}</div>
        </div>
        <div className="flex">
          <div className="">Bạn có thể xem chi tiết </div>
          <Link className="text-blue-700 pl-1">Đơn hàng của tôi</Link>
        </div>

        <div className="py-4">
          <Link
            to={"/"}
            className="bg-blue-600 text-white font-bold rounded-[5px] py-2 px-6"
          >
            Tiếp tục mua hàng
          </Link>
        </div>
      </div>
    </div>
  );
}