import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setPage } from '../../store/slices/newsSlice';
import BlogCard from './BlogCard';
import PaginationNav1 from '../PaginationNav1';
import SidebarBlog from './SidebarBlog';
import Skeleton from 'react-loading-skeleton';

const BlogPage = () => {
    const dispatch = useDispatch();
    const { news, loading, currentPage, totalPages } = useSelector((state) => state.news);
    const itemsPerPage = 12;

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const handlePageChange = (pageIndex) => {
        dispatch(setPage(pageIndex + 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newsForPage = news.slice(startIndex, endIndex);

    if (loading) {
        return (
            <div>
                <Skeleton count={itemsPerPage} />
            </div>
        );
    }

    return (
        <div>
            <div className='py-10 flex flex-col lg:flex-row gap-12'>
                {loading ? (
                    <Skeleton count={itemsPerPage} />
                ) : (
                    <BlogCard blogs={newsForPage} />
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
