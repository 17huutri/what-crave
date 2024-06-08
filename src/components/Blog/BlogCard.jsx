import React from 'react'
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const BlogCard = ({ blogs }) => {

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const filteredBlogs = blogs;
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {
                filteredBlogs.map((blog) => <Link className='p-5 shadow-lg rounded cursor-pointer bg-orange-100' key={blog.id} to={`/blog/${blog.id}`}  >
                    <div>
                        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />

                    </div>
                    <h3 className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer '>{blog.title}</h3>
                    <p className='mb-2 text-gray-600'><FaUser className='inline-flex items-center mr-2' />{blog.author}</p>
                    <p className='text-sm text-gray-600'>Đăng tải: {formatDate(blog.createDate)}</p>
                </Link>)

            }
        </div >
    )
}

export default BlogCard
