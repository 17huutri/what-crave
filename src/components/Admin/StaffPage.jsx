import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Modal, Select, Table, Form, Button } from "antd";
import { fetchAllUsers, updateUserStatus, createStaffAccount } from "../../store/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";

const StaffPage = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.admin);
    const [searchText, setSearchText] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            defaultSortOrder: "ascend",
            render: (name) => (
                <div className="font-semibold flex items-center">
                    <span className="px-2 rounded-md font-semibold uppercase bg-[#2ed5ff] text-[#000000]">
                        {name}
                    </span>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (email) => <p>{email}</p>,
        },
        {
            title: "SĐT",
            dataIndex: "phone",
            key: "phone",
            render: (phone) => <p>{phone}</p>,
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role) => (
                <span
                    className={`px-2 py-1 rounded-md font-semibold ${role === "admin"
                        ? "bg-black text-white"
                        : "bg-[#3e9ff396] text-[#0e2aff]"
                        }`}
                >
                    {role}
                </span>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (status, record) => (
                <button
                    onClick={() => handleActiveUser(record.id, status)}
                    className={`px-3 py-[2px] rounded-md font-semibold ${status ? " bg-[#50f750ba]" : "text-white bg-[#ff0000de]"
                        }`}
                >
                    {status ? "Đang hoạt động" : "Đã bị chặn"}
                </button>
            ),
        },
    ];

    const filterData = () => {
        let filteredUsers = users;

        if (selectedRole) {
            filteredUsers = filteredUsers.filter(
                (user) => user.role === selectedRole
            );
        }
        if (selectedStatus) {
            filteredUsers = filteredUsers.filter(
                (user) => user.status === (selectedStatus === "Enable")
            );
        }
        if (searchText) {
            filteredUsers = filteredUsers.filter((user) => {
                return user.name.toLowerCase().includes(searchText.toLowerCase());
            });
        }

        return filteredUsers;
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleRoleChange = (value) => {
        setSelectedRole(value);
    };

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    const handleActiveUser = (id, status) => {
        const newStatus = !status;
        dispatch(updateUserStatus({ id, status: newStatus }))
            .then(() => {
                toast.success(`Cập nhật trạng thái ${newStatus ? 'Hoạt động ' : 'Chặn'} thành công!`);
                const updatedUsers = users.map(user => {
                    if (user.id === id) {
                        return { ...user, status: newStatus };
                    }
                    return user;
                });
                dispatch({ type: 'admin/updateUsers', payload: updatedUsers });
            })
            .catch((error) => {
                toast.error("Cập nhật trạng thái thất bại!");
                console.error(error);
            });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFinish = (values) => {
        dispatch(createStaffAccount(values))
            .unwrap()
            .then(() => {
                toast.success("Tài khoản nhân viên được tạo thành công!");
                setIsModalOpen(false);
                form.resetFields();
            })
            .catch((error) => {
                toast.error("Tài khoản nhân viên được tạo thất bại!");
                console.error(error);
            });
    };

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <div className="w-full h-full overflow-y-auto px-4 py-20">
            <h1 className="text-5xl font-bold mb-4 text-center font-beVn">Quản lý nhân viên</h1>
            <div className="px-[5%] py-[2%]">
                <div className="flex pb-4 justify-between items-center">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Tìm kiếm theo tên"
                            value={searchText}
                            onChange={handleSearch}
                        />
                        <Select
                            placeholder="Vai trò"
                            value={selectedRole}
                            onChange={handleRoleChange}
                        >
                            <Select.Option value="">Tất cả</Select.Option>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="staff">Nhân viên</Select.Option>
                        </Select>
                        <Select
                            placeholder="Activation Options"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <Select.Option value="">Tất cả</Select.Option>
                            <Select.Option value="Enable">Hoạt động</Select.Option>
                            <Select.Option value="Disable">Đã bị chặn</Select.Option>
                        </Select>
                    </div>
                    <button
                        onClick={showModal}
                        className="float-right px-4 py-2 bg-blue_2 text-white rounded-[8px] font-medium"
                    >
                        Tạo tài khoản nhân viên
                    </button>
                    <Modal
                        title="Tạo tài khoản nhân viên"
                        open={isModalOpen}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                        >
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Nhập mật khẩu nè !' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Tạo
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <Table
                    columns={columns}
                    dataSource={filterData()}
                    rowKey={(record) => record.id}
                    loading={loading}
                    pagination={{
                        position: ["bottomCenter"],
                    }}
                />
            </div>
            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
};

export default StaffPage;
