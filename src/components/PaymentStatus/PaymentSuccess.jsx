import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const PaymentSuccess = ({ id }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-main_color_3">
      <div className="bg-white rounded-[10px] w-[32%] h-[32%] items-center flex flex-col space-y-1">
        <div className="py-5">
          <BsCheckCircleFill style={{ color: "#23d747", fontSize: "60px" }} />
        </div>
        <div className="font-bold pb-2 text-[20px]">Thanh toán thành công</div>
        <div className="flex">
          <div>Mã số đơn hàng của bạn là</div>
          <div className="text-green-500 font-bold pl-1">{id}</div>
        </div>
        <div className="flex">
          <div>Bạn có thể xem chi tiết </div>
          <Link className="text-blue-700 pl-1" to="/staff/orders">Đơn hàng của tôi</Link>
        </div>
        <div className="py-4">
          <Link to="/" className="bg-blue-600 text-white font-bold rounded-[5px] py-2 px-6">
            Tiếp tục mua hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
