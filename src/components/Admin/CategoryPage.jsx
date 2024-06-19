import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Modal, Table, Form, Button } from "antd";
import {
    fetchAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../store/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.admin);
    const [categoryList, setCategoryList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        setCategoryList(categories);
    }, [categories]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const showModal = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setSelectedCategory(record);
        setIsModalOpen(true);
        form.setFieldsValue(record);
    };

    const confirmDelete = (id) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn xóa danh mục này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleDelete(id);
            },
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteCategory(id))
            .unwrap()
            .then(() => {
                toast.success("Xóa danh mục thành công!");
                setCategoryList(categoryList.filter(category => category.categoryId !== id));
            })
            .catch((error) => {
                toast.error("Xóa danh mục thất bại!");
                console.error(error);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleFinish = (values) => {
        if (selectedCategory) {
            dispatch(updateCategory({ ...values, categoryId: selectedCategory.categoryId }))
                .unwrap()
                .then((updatedCategory) => {
                    console.log("Updated Category: ", updatedCategory);
                    toast.success("Cập nhật danh mục thành công!");
                    setIsModalOpen(false);
                    form.resetFields();
                    setCategoryList(categoryList.map(category => category.categoryId === updatedCategory.categoryId ? updatedCategory : category));
                })
                .catch((error) => {
                    toast.error("Cập nhật danh mục thất bại!");
                    console.error(error);
                });
        } else {
            dispatch(createCategory(values))
                .unwrap()
                .then((newCategory) => {
                    console.log("New Category: ", newCategory);
                    toast.success("Tạo danh mục thành công!");
                    setIsModalOpen(false);
                    form.resetFields();
                    setCategoryList([...categoryList, newCategory]);
                })
                .catch((error) => {
                    toast.error("Tạo danh mục thất bại!");
                    console.error(error);
                });
        }
    };

    const filteredCategories = categoryList.filter(category => {
        return searchText === '' || category.name.toLowerCase().includes(searchText.toLowerCase());
    });

    const columns = [
        {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (name) => <p>{name}</p>,
        },
        {
            title: "Mô tả",
            dataIndex: "categoryDescription",
            key: "categoryDescription",
            render: (description) => <p>{description}</p>,
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <div>
                    <Button type="primary" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
                    <Button type="danger" onClick={() => confirmDelete(record.categoryId)} icon={<DeleteOutlined />} />
                </div>
            ),
        },
    ];

    return (
        <div className="w-full h-full overflow-y-auto px-4 py-20 font-inter font-medium">
            <h1 className="text-5xl text-center font-bold mb-4 font-beVn">Quản lý danh mục</h1>
            <div className="px-[5%] py-[2%]">
                <div className="flex pb-4 justify-between items-center">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Tìm kiếm theo tên danh mục"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                    <Button className="bg-black" onClick={showModal} type="primary">
                        Tạo mới danh mục
                    </Button>
                    <Modal
                        title={selectedCategory ? "Chỉnh sửa danh mục" : "Tạo mới danh mục"}
                        visible={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                            initialValues={selectedCategory}
                        >
                            <Form.Item
                                label="Tên danh mục"
                                name="name"
                                rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="categoryDescription"
                                rules={[{ required: true, message: "Vui lòng nhập mô tả danh mục!" }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {selectedCategory ? "Cập nhật" : "Tạo mới"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredCategories}
                    rowKey={(record) => record.categoryId}
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

export default CategoryPage;
