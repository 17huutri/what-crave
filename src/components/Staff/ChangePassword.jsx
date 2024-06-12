import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Alert } from 'antd';
import { setIsLogin, changePassword } from '../../store/slices/accountSlice';

const ChangePassword = () => {
    const [confirmMessage, setConfirmMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.accountReducer.loading);
    const success = useSelector((state) => state.accountReducer.success);
    const error = useSelector((state) => state.accountReducer.error);
    const [form] = Form.useForm();

    const handleChangePassword = (values) => {
        const { currentPassword, newPassword, confirmNewPassword } = values;

        if (newPassword !== confirmNewPassword) {
            setConfirmMessage('Mật khẩu xác nhận không khớp.');
            setErrorMessage('');
            return;
        }

        dispatch(changePassword({ currentPassword, newPassword, confirmNewPassword }));
        setConfirmMessage('');

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Đổi mật khẩu</h2>
                {error && <Alert message={error} type="error" showIcon className="mb-4" />}
                {success && (
                    <Alert message="Thay đổi mật khẩu thành công!" type="success" showIcon className="mb-4" />
                )}
                {confirmMessage && <Alert message={confirmMessage} type="info" showIcon className="mb-4" />}
                <Form
                    form={form}
                    onFinish={handleChangePassword}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="currentPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu mới"
                        name="confirmNewPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        setConfirmMessage('');
                                        setErrorMessage('');
                                        return Promise.resolve();
                                    }
                                    setConfirmMessage('Mật khẩu không khớp');
                                    setErrorMessage('');
                                    return Promise.reject('Mật khẩu không khớp');
                                },
                            }),
                        ]}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                    {errorMessage && <Alert message={errorMessage} type="error" showIcon className="mb-4" />}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassword;
