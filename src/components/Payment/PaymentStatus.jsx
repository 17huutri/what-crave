import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faCircleCheck, faX } from "@fortawesome/free-solid-svg-icons";


const PaymentStatus = () => {
    let status = success;
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-[10px]  w-[32%] h-[32%]  items-center flex flex-col space-y-1 ">
                <div className="py-5">
                    {status === "success" ? (
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{ color: "#23d747", fontSize: "60px" }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faX}
                            style={{ color: "red", fontSize: "60px" }}
                        />
                    )}
                </div>
                <div className="font-bold pb-2 text-[20px]">
                    Thanh toán {status === "success" ? "thành công" : "không thành công"}{" "}
                </div>
                <div className="flex ">
                    <div className="">Mã số đơn hàng của bạn là</div>
                    <div className="text-green-500 font-bold pl-1">1</div>
                </div>
                <div className="flex">
                    <div className="">Bạn có thể xem chi tiết </div>
                    <Link to={"/"}
                        className="text-blue-700 pl-1">Đơn hàng của tôi</Link>
                </div>
            </div>
        </div>
    );
};
export default PaymentStatus;