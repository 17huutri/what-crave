import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Modal, Select, Table, Form, Button, Space, Popconfirm, Switch } from "antd";
import {
    fetchCatalog,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchAllCategories,
    updateProductStatus
} from "../../store/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductPage = () => {
    const dispatch = useDispatch();
    const { products: reduxProducts, categories, loading } = useSelector((state) => state.admin);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchCatalog());
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        setProducts(reduxProducts);
    }, [reduxProducts]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    const showModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setSelectedProduct(record);
        setIsModalOpen(true);
    };

    const handleUpdateStatus = (id, checked) => {
        const newStatus = checked;
        dispatch(updateProductStatus({ id: id, status: newStatus }))
            .unwrap()
            .then(() => {
                toast.success(`Sản phẩm đã được ${newStatus ? "kích hoạt" : "vô hiệu hóa"}!`);
                setProducts(
                    products.map((product) =>
                        product.id === id ? { ...product, status: newStatus } : product
                    )
                );
            })
            .catch((error) => {
                toast.error("Cập nhật trạng thái thất bại!");
                console.error(error);
            });
    };
    const confirmDelete = (id) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleDelete(id);
            },
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
            .unwrap()
            .then(() => {
                toast.success("Xóa sản phẩm thành công!");
                setProducts(products.filter(product => product.id !== id));
            })
            .catch((error) => {
                toast.error("Xóa sản phẩm thất bại!");
                console.error(error);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFinish = (values) => {
        if (selectedProduct) {
            dispatch(updateProduct({ id: selectedProduct.id, ...values }))
                .unwrap()
                .then((updatedProduct) => {
                    toast.success("Cập nhật sản phẩm thành công!");
                    setIsModalOpen(false);
                    form.resetFields();
                    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
                })
                .catch((error) => {
                    toast.error("Cập nhật sản phẩm thất bại!");
                    console.error(error);
                });
        } else {
            dispatch(createProduct(values))
                .unwrap()
                .then((newProduct) => {
                    toast.success("Tạo sản phẩm thành công!");
                    setIsModalOpen(false);
                    form.resetFields();
                    setProducts([...products, newProduct]);
                })
                .catch((error) => {
                    toast.error("Tạo sản phẩm thất bại!");
                    console.error(error);
                });
        }
    };

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === null || selectedCategory === undefined || product.categoryName === selectedCategory;
        const nameMatch = searchText === '' || product.name.toLowerCase().includes(searchText.toLowerCase());
        return categoryMatch && nameMatch;
    });



    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (name) => <p>{name}</p>,
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image) => <img src={image} alt="Product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
            render: (price) => <p>{formatCurrency(price)}</p>,
        },
        {
            title: "Danh mục",
            dataIndex: "categoryName",
            key: "categoryName",
            render: (categoryName) => <p>{categoryName}</p>,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <Switch
                    checked={status}
                    onChange={(checked) => handleUpdateStatus(record.id, checked)}
                />
            ),
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <div>
                    <Button type="primary" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
                    <Button type="danger" onClick={() => confirmDelete(record.id)} icon={<DeleteOutlined />} />
                </div>
            ),
        },
    ];

    const formatCurrency = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    return (
        <div className="w-full h-full overflow-y-auto px-4 py-20 font-inter font-medium">
            <h1 className="text-5xl text-center font-bold mb-4 font-beVn">Quản lý sản phẩm</h1>
            <div className="px-[5%] py-[2%]">
                <div className="flex pb-4 justify-between items-center">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Tìm kiếm theo tên sản phẩm"
                            value={searchText}
                            onChange={handleSearch}
                        />
                        <Select
                            placeholder="Lọc theo danh mục"
                            style={{ width: 200 }}
                            onChange={handleCategoryChange}
                            allowClear
                        >
                            {categories.map(category => (
                                <Select.Option key={category.name} value={category.name}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <Button className="bg-black" onClick={showModal} type="primary">
                        Tạo mới sản phẩm
                    </Button>
                    <Modal
                        title={selectedProduct ? "Chỉnh sửa sản phẩm" : "Tạo mới sản phẩm"}
                        visible={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleFinish}
                            initialValues={selectedProduct}
                        >
                            <Form.Item
                                label="Tên sản phẩm"
                                name="name"
                                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                label="Giá"
                                name="price"
                                rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
                            >
                                <Input type="number" min={0} />
                            </Form.Item>
                            <Form.Item
                                label="Danh mục"
                                name="categoryId"
                                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
                            >
                                <Select mode="multiple">
                                    {categories.map((category) => (
                                        <Select.Option key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Hình ảnh"
                                name="image"
                                rules={[{ required: true, message: "Vui lòng nhập đường dẫn hình ảnh!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                                <Select>
                                    <Select.Option value={true}>Active</Select.Option>
                                    <Select.Option value={false}>Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {selectedProduct ? "Cập nhật" : "Tạo mới"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredProducts}
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

export default ProductPage;
