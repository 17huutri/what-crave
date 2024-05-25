import React, { useState } from 'react';

const Login = () => {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="input" className="block text-gray-700">
                            Số điện thoại hoặc địa chỉ email
                        </label>
                        <input
                            type="text"
                            id="input"
                            className="mt-1 p-2 w-full border rounded"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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
