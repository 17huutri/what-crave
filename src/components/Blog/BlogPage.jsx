import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../store/slices/newsSlice';
import BlogCard from './BlogCard';
import PaginationNav1 from '../PaginationNav1';
import SidebarBlog from './SidebarBlog';
import Skeleton from 'react-loading-skeleton';

const BlogPage = () => {
    const dispatch = useDispatch();
    const { news, loading } = useSelector((state) => state.news);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    if (loading) {
        return (
            <div>
                <Skeleton count={12} />
            </div>
        );
    }

    const totalPages = Math.ceil((news?.length || 0) / itemsPerPage);

    const getNewsForPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = pageNumber * itemsPerPage;
        return news.slice(startIndex, endIndex);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className='py-10 flex flex-col lg:flex-row gap-12'>
                {loading ? (
                    <Skeleton count={getNewsForPage(currentPage).length} />
                ) : (
                    <BlogCard blogs={getNewsForPage(currentPage)} />
                )}

                <div>
                    {loading ? (
                        <Skeleton count={5} />
                    ) : (
                        <SidebarBlog blogs={news} />
                    )}
                </div>
            </div>
            <div className="flex py-4 justify-center">
                <PaginationNav1
                    gotoPage={handlePageChange}
                    canPreviousPage={currentPage > 1}
                    canNextPage={currentPage < totalPages}
                    pageCount={totalPages}
                    pageIndex={currentPage - 1}
                />
            </div>
        </div>
    );
};

export default BlogPage;