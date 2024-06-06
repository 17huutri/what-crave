import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="text-center">
                    <h2 className="mt-4 text-9xl font-extrabold text-gray-900">404</h2>
                    <p className="mt-4 text-2xl font-semibold text-gray-600">Oops! Trang không tồn tại</p>
                    <p className="mt-4 text-gray-500">Xin lỗi, trang bạn yêu cầu không thể tìm thấy.</p>
                    <div className="mt-6">
                        <a
                            href="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Về trang chủ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;