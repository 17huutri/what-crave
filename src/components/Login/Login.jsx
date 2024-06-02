import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import accountApi from '../../api/accountApi';
import storageService from '../../api/storageService';
import { setIsLogin, setRole } from '../../store/slices/accountSlice';
import { ROLE } from '../../api/constant_api';

const Login = () => {
    const { role } = useSelector((state) => state.accountReducer);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roleToken = ROLE;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = { email, password };
            const res = await accountApi.login(data);
            if (res && res.data && res.data._data) {
                const unDecodeToken = res.data._data.accessToken;
                storageService.setAccessToken(unDecodeToken);
                const token = jwtDecode(unDecodeToken);
                dispatch(setIsLogin(true));
                dispatch(setRole(token[roleToken]));
                storageService.setRole(token[roleToken]);
                if (role === 'staff') {
                    navigate('/staff');
                } else if (role === 'staff') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
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
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                {message && <div className="text-red-500 mb-4">{message}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
