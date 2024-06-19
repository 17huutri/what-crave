import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews, createNews, updateNews, deleteNews } from "../../store/slices/adminSlice";
import { Modal, Form, Input, Button, Table, DatePicker, Space, Switch } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsPage = () => {
    const dispatch = useDispatch();
    const { news, loading } = useSelector((state) => state.admin);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchAllNews());
    }, [dispatch]);

    const showModal = () => {
        setSelectedNews(null);
        setIsModalVisible(true);
        form.resetFields();
        setImagePreview(null);
    };

    const handleEdit = (record) => {
        setSelectedNews(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            title: record.title,
            content: record.content,
            author: record.author,
            createDate: moment(record.createDate),
            image: record.image,
            status: record.status,
        });
        setImagePreview(record.image);
    };

    const confirmDelete = (id) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn xóa tin tức này?",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleDelete(id);
            },
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteNews(id))
            .unwrap()
            .then(() => {
                toast.success("Xóa tin tức thành công!");
            })
            .catch((error) => {
                toast.error("Xóa tin tức thất bại!");
                console.error(error);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setImagePreview(null);
    };

    const handleFinish = (values) => {
        const newsData = {
            id: selectedNews ? selectedNews.id : 0,
            title: values.title,
            content: values.content,
            createDate: values.createDate.toISOString(),
            author: values.author,
            image: values.image,
            status: values.status,
        };

        const action = selectedNews ? updateNews(newsData) : createNews(newsData);

        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success(selectedNews ? "Cập nhật tin tức thành công!" : "Tạo tin tức thành công!");
                setIsModalVisible(false);
                form.resetFields();
                setImagePreview(null);
                dispatch(fetchAllNews());
            })
            .catch((error) => {
                toast.error(selectedNews ? "Cập nhật tin tức thất bại!" : "Tạo tin tức thất bại!");
                console.error(error);
            });
    };

    const handleSearch = (value) => {
        setSearchText(value.toLowerCase());
    };

    const filteredNews = news.filter(newsItem => {
        return newsItem.title.toLowerCase().includes(searchText);
    });

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            ellipsis: true,
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (createDate) => moment(createDate).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => image ? <img src={image} alt="Hình ảnh" style={{ width: '50px' }} /> : null,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Switch checked={status} disabled />,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => confirmDelete(record.id)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="w-full h-full overflow-y-auto px-4 py-20 font-inter font-medium">
            <h1 className="text-5xl text-center font-bold mb-4">Quản lý tin tức</h1>
            <div className="px-[5%] py-[2%]">
                <div className="flex pb-4 justify-between items-center">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Tìm kiếm theo tiêu đề tin tức"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Button className="bg-black" onClick={showModal} type="primary">
                            Tạo mới tin tức
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredNews}
                    rowKey={(record) => record.id}
                    loading={loading}
                    pagination={{ position: ['bottomCenter'] }}
                />
                <Modal
                    title={selectedNews ? 'Chỉnh sửa tin tức' : 'Tạo mới tin tức'}
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={handleFinish}
                        layout="vertical"
                        initialValues={{
                            createDate: moment(),
                            status: true,
                        }}
                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề tin tức!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung tin tức!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Ngày tạo"
                            name="createDate"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày tạo tin tức!' }]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                        <Form.Item
                            label="Tác giả"
                            name="author"
                            rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Hình ảnh"
                            name="image"
                            rules={[{ required: true, message: "Vui lòng nhập đường dẫn hình ảnh!" }]}
                        >
                            <Input placeholder="Nhập URL hình ảnh" />
                        </Form.Item>
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {selectedNews ? 'Cập nhật' : 'Tạo mới'}
                            </Button>
                            <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
};

export default NewsPage;
