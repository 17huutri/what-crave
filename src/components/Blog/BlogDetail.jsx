import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsDetail, clearNewsDetail } from '../../store/slices/newsSlice';
import Skeleton from 'react-loading-skeleton';

const BlogDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const newsDetail = useSelector((state) => state.news.newsDetail);
    const loadingDetail = useSelector((state) => state.news.loadingDetail);

    useEffect(() => {
        dispatch(fetchNewsDetail(id));

        return () => {
            dispatch(clearNewsDetail());
        };
    }, [dispatch, id]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    if (loadingDetail || !newsDetail) {
        return (
            <div className="py-40 max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
                <div className='lg:w-3/4 mx-auto animate-pulse'>
                    <Skeleton height="10" />
                    <Skeleton height="64" />
                    <Skeleton height="6" width="50%" />
                    <Skeleton height="6" width="25%" />
                    <Skeleton height="96" />
                </div>
            </div>
        );
    }


    if (!newsDetail) {
        return <div className='py-40 text-5xl text-center'>Không có tin tức này ở đây!</div>;
    }

    return (
        <div className="py-40 max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
            <div className='lg:w-3/4 mx-auto'>
                <h1 className="text-3xl font-bold mb-4 text-main_color_2 cursor-pointer">{newsDetail.title}</h1>
                <div className="mb-4">
                    <img src={newsDetail.image} alt={newsDetail.title} className="w-full mx-auto rounded" />
                </div>
                <p className="mb-3 text-gray-600">
                    <FaUser className="inline-flex items-center mr-2" />
                    {newsDetail.author}
                </p>
                <p className="mb-4 text-gray-600">Đăng tải: {formatDate(newsDetail.createDate)}</p>
                <div className="content prose max-w-none font-beVn" dangerouslySetInnerHTML={{ __html: newsDetail.content }}></div>
            </div>
        </div>
    );
};

export default BlogDetail;
