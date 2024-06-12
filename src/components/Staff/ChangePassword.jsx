import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import accountApi from '../../api/accountApi';
import { setIsLogin } from '../../store/slices/accountSlice';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setConfirmMessage('Mật khẩu xác nhận không khớp.');
            return;
        }

        try {
            const res = await accountApi.changePassword({ oldPassword, newPassword });
            if (res && res.data && res.data._message) {
                setMessage(res.data._message);
                dispatch(setIsLogin(false));
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data._message) {
                setMessage(error.response.data._message);
            } else {
                setMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đổi mật khẩu</h2>
                {message && <div className="text-red-500 mb-4">{message}</div>}
                <form onSubmit={handleChangePassword}>
                    <div className="mb-4">
                        <label htmlFor="oldPassword" className="block text-gray-700">Mật khẩu cũ</label>
                        <input
                            type="password"
                            id="oldPassword"
                            className="mt-1 p-2 w-full border rounded"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-700">Mật khẩu mới</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="mt-1 p-2 w-full border rounded"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Xác nhận mật khẩu mới</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 p-2 w-full border rounded"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        {confirmMessage && <div className="text-red-500 mt-2">{confirmMessage}</div>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Đổi mật khẩu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
