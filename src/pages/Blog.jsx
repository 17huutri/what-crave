import React from 'react';
import BlogPage from '../components/Blog/BlogPage'
import bgBlog from '../assets/landing_pages/bg.jpg';

const Blog = () => {


    return (

        <div>
            <div className='py-32 text-center text-main_color_1  px-4' style={{
                backgroundImage: `url(${bgBlog})`,
            }}>
                <h2 className='text-4xl lg:text-5xl leading-snug font-semibold font-inter italic  mt-5'>Thèm - Hành Trình Khám Phá Sự Hấp Dẫn</h2>
            </div>
            <div className='max-w-7xl mx-auto'>

                <BlogPage />

            </div>
        </div>
    )
}

export default Blog
