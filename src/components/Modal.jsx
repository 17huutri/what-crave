import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import accountApi from '../api/accountApi';
import storageService from '../api/storageService';
import { setIsLogin, setRole } from '../store/slices/accountSlice';
import { ROLE } from '../api/constant_api';

const Modal = ({ isOpen, onClose }) => {
    const { role } = useSelector((state) => state.accountReducer);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roleToken = ROLE;

    const onSubmit = async (data) => {
        try {
            const res = await accountApi.login(data);
            if (res && res.data && res.data._data) {
                const unDecodeToken = res.data._data.accessToken;
                storageService.setAccessToken(unDecodeToken);
                const token = jwtDecode(unDecodeToken);
                dispatch(setIsLogin(true));
                dispatch(setRole(token[roleToken]));
                storageService.setRole(token[roleToken]);
                onClose();
                if (role === 'staff') {
                    navigate('/staff');
                } else if (role === 'admin') {
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
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
            <div className='modal-container'>

                <div className='bg-main_color_3 p-8 rounded shadow-md h-96 lg:w-[500px] max-w-md relative'>
                    <button className="absolute top-1 bg- right-2 text-main_color_1 text-2xl" onClick={onClose}>
                        &times;
                    </button>
                    <h2 className='text-xl font-semibold mt-6 mb-5 text-center uppercase font-beVn'>Vui lòng đăng nhập ở đây!</h2>
                    {message && <div className="text-red-500 mb-4">{message}</div>}
                    <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 w-full border rounded"
                                {...register('email', { required: 'Email là bắt buộc' })}
                            />
                            {errors.email && <div className="text-red-500 mt-1">{errors.email.message}</div>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 w-full border rounded"
                                {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                                autoComplete="current-password"
                            />
                            {errors.password && <div className="text-red-500 mt-1">{errors.password.message}</div>}
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
        </div>
    );
};

export default Modal;
